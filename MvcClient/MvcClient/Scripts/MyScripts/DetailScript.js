var tokenKey = "tokenKey";
$(document).ready(function () {
    $("#getAllBtn").on("click", getAll);
    $("#addProductBtn").on("click", postProduct);
    $("#data").on("click", "#delBtn.btn", deleteProduct);
    $("#data").on("click", "#updBtn.btn", updateProduct);
});

var baseUri = "http://localhost:10282/api/Detail";
var delBtn = $('<td><input type="button" value="Delete" id="delBtn" class="btn btn-info"></td>');
var editBtn = $('<td><input type="button" value="Edit" id="updBtn" class="btn btn-info"></td>');

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
                    append("<td>" + Products[i].Name + "</td>").
                    append("<td>" + Products[i].Color + "</td>").
                    append("<td>" + Products[i].Weight + "</td>").
                    append("<td>" + Products[i].City + "</td>").
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
    data.name = $("#productName").val();
    data.color = $("#productColor").val();
    data.weight = $("#productWeight").val();
    data.city = $("#productCity").val();

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

        //позволяет выполнять различные функции, в зависимости от полученного статус-кода


        success: function (data, textStatus, xhr) {
            // data - информация, переданная обратно в теле ответа
            // textStatus - статус операции
            // xhr - обьект XMLHttpRequest

            var locationHeader = xhr.getResponseHeader("Location");

            $("#location").html("<a href='" + locationHeader + "'>последний элемент</a>");

            var tr = $("<tr>").append("<td>" + data.Id + "</td>").
                    append("<td>" + data.Name + "</td>").
                    append("<td>" + data.Color + "</td>").
                    append("<td>" + data.Weight + "</td>").
                    append("<td>" + data.City + "</td>").
                    append(editBtn.clone()).
                    append(delBtn.clone());

            $("#data").append(tr);
        },

        error: errorHandler
    });
}
function putProduct(id, row) {



    var data = new Object();
    data.name = $("#updateName").val();
    data.color = $("#updateColor").val();
    data.weight = $("#updateWeight").val();
    data.city = $("#updateCity").val();

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
            HideUpdate(row, data);
        },

        error: errorHandler
    });
    $("#updateDiv").hide();
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

function ShowUpdate(row) {

    var Id = row.children(":first").html();
    var Name = row.children(":nth-child(2)");
    var Color = row.children(":nth-child(3)");
    var Weight = row.children(":nth-child(4)");
    var City = row.children(":nth-child(5)");

    var valueName = $(Name).html();
    var valueColor = $(Color).html();
    var valueWeight = $(Weight).html();
    var valueCity = $(City).html();

    $(Name).empty();
    $(Color).empty();
    $(Weight).empty();
    $(City).empty();

    $(Name).append('<input type="text" value="' + valueName + '" id="updateName' + Id + '" />');
    $(Color).append('<input type="text" value="' + valueColor + '" id="updateColor' + Id + '" />');
    $(Weight).append('<input type="text" value="' + valueWeight + '" id="updateWeight' + Id + '" />');
    $(City).append('<input type="text" value="' + valueCity + '" id="updateCity' + Id + '" />');

}

function HideUpdate(row, data) {

    var id = row.children(":first").html();

    var Name = row.children(":nth-child(2)");
    var Color = row.children(":nth-child(3)");
    var Weight = row.children(":nth-child(4)");
    var City = row.children(":nth-child(5)");

    $(Name).empty();
    $(Color).empty();
    $(Weight).empty();
    $(City).empty();

    $(Name).html(data.Name);
    $(Color).html(data.Color);
    $(Weight).html(data.Weight);
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



