var tokenKey = "tokenKey";
$(document).ready(function () {
    $("#getAllBtn").on("click", getAll);
    $("#addBtn").on("click", postProduct);
    $("#data").on("click", "#delBtn.btn", deleteProduct);
    $("#data").on("click", "#updBtn.btn", updateProduct);
    initializeSelects();
});

var baseUri = "http://localhost:10282/api/SDP";
var delBtn = $('<td><input type="button" value="Delete" id="delBtn" class="btn btn-info"></td>');
var editBtn = $('<td><input type="button" value="Edit" id="updBtn" class="btn btn-info"></td>');

function initializeSelects(){
    loadSelect("http://localhost:10282/api/Supplier", "#selectSupplier");
    loadSelect("http://localhost:10282/api/Detail", "#selectDetail");
    loadSelect("http://localhost:10282/api/Project", "#selectProject");
}

function loadSelect(url, selectId) {
    $.ajax({
        url: url,
        beforeSend: function (xhr) {
            var token = sessionStorage.getItem(tokenKey);
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function (Products) {

            var select = $(selectId);

            for (var i = 0; i < Products.length; i++) {
                select.append('<option value=' + Products[i].Id + '>' + Products[i].Name);
            }
        }

    });
}


function getAll() {
    $.ajax({
        url: baseUri,
        beforeSend: function (xhr) {

            var token = sessionStorage.getItem(tokenKey);
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function (Products) {

            var table = $("#data");
            table.empty();

            for (var i = 0; i < Products.length; i++) {
                var tr = $("<tr>").append("<td>" + Products[i].Id + "</td>").
                    append("<td>" + Products[i]["Supplier"].Name + "</td>").
                    append("<td>" + Products[i]["Project"].Name + "</td>").
                    append("<td>" + Products[i]["Detail"].Name + "</td>").
                     append("<td>" + Products[i].Quantity + "</td>").
                    append(editBtn.clone()).
                    append(delBtn.clone());
                table.append(tr);

            }

        },
        error: errorHandler
    });
}

function postProduct(e) {
    e.preventDefault();
    var data = new Object();
    data.supplierId = $("#selectSupplier").val();
    data.projectId = $("#selectProject").val();
    data.detailId = $("#selectDetail").val();
    data.quantity = $("#selectQuantity").val();

    $.ajax({
        url: baseUri,
        type: "POST",
        data: JSON.stringify(data), // сериализуем данные в JSON объект перед отправкой на сервер.
        dataType: "json",
        contentType: "application/json",
        beforeSend: function (xhr) {

            var token = sessionStorage.getItem(tokenKey);
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },

        success: function (element, textStatus, xhr) {                     
            getAll();           
        },

        error: errorHandler
    });
}

function deleteProduct() {

    var row = $(this).parent().parent();
    var id = row.children(':first').html();

    $.ajax({
        url: baseUri + "/" + id,
        type: "DELETE",
        beforeSend: function (xhr) {

            var token = sessionStorage.getItem(tokenKey);
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },

        success: function () {
            getAll();
        },

        error: errorHandler
    });
}

function putProduct(id, row) {

    var data = new Object();
    data.supplierId = $("#updateSupplier" + id).val();
    data.projectId = $("#updateProject" + id).val();
    data.detailId = $("#updateDetail" + id).val();
    data.quantity = $("#updateQuantity" + id).val();

    $.ajax({
        url: baseUri + "/" + id,
        type: "PUT",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function (xhr) {

            var token = sessionStorage.getItem(tokenKey);
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },

        success: function (data, status, xhr) {
            getAll();
        },

        error: errorHandler
    });
    $("#updateDiv").hide();
}

function ShowUpdate(row) {

    var Id = row.children(":first").html();
    var Supplier = row.children(":nth-child(2)");
    var Project = row.children(":nth-child(3)");
    var Detail = row.children(":nth-child(4)");
    var Quantity = row.children(":nth-child(5)");

    var valueQuantity = $(Quantity).html();

    $(Supplier).empty();
    $(Project).empty();
    $(Detail).empty();
    $(Quantity).empty();

    $(Supplier).append('<select id="updateSupplier' + Id + '" />');
    $(Project).append('<select id="updateProject' + Id + '" />');
    $(Detail).append('<select  id="updateDetail' + Id + '" />');
    $(Quantity).append('<input type="text" value="' + valueQuantity + '" id="updateQuantity' + Id + '" />');

    loadSelect("http://localhost:10282/api/Supplier", "#updateSupplier" + Id);
    loadSelect("http://localhost:10282/api/Detail", "#updateDetail" + Id);
    loadSelect("http://localhost:10282/api/Project", "#updateProject" + Id);

}

function HideUpdate(row, data) {

    var id = row.children(":first").html();

    var Name = row.children(":nth-child(2)");
    var Status = row.children(":nth-child(3)");
    var City = row.children(":nth-child(4)");

    $(Name).empty();
    $(Status).empty();
    $(City).empty();

    $(Name).html(data.Name);
    $(Status).html(data.Status);
    $(City).html(data.City);

}

function updateProduct() {

    var btn = $(this);
    var row = $(this).parent().parent();
    if (btn.val() == "Edit") {
        ShowUpdate(row);
        btn.val("Update");
    }
    else if (btn.val() == "Update") {
        var Id = row.children(":first").html();

        putProduct(Id, row);
        btn.val("Edit");
    }
}



function errorHandler(xhr, textStatus, error) {
    if (xhr.status == "404") {
        alert('Элемент не найден.')
    }
    else if (xhr.status == "400") {
        alert('Запрос сформирован не правильно.')
    }
    else if (xhr.status == "500") {
        alert('Ошибка сервера.')
    }
    else if (xhr.status == "401") {
        alert("Please authorize")
    }
    else if (xhr.status == "409") {
        alert("Entity with this name already exists")
    }
}