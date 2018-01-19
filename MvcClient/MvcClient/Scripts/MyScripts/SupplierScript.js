var tokenKey = "tokenKey";
$(document).ready(function () {
    $("#getAllBtn").on("click", getAll);
    $("#addProductBtn").on("click", postProduct);
    $("#updateProductBtn").on("click", putProduct);
    $("#deleteProductBtn").on("click", deleteProduct);
    $("#showUpdateDivBtn").on("click", showUpdateDiv);
});

var baseUri = "http://localhost:10282/api/Supplier";

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
                table.append("<tr>").
                    append("<td>" + Products[i].Id + "</td>").
                    append("<td>" + Products[i].Name + "</td>").
                    append("<td>" + Products[i].Status + "</td>").
                    append("<td>" + Products[i].City + "</td>").
                append("</tr>");
            }
        }
    });
}

function postProduct() {

    var data = new Object();
    data.name = $("#productName").val();
    data.status = $("#productStatus").val();
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

            $("#data").append("<tr>").
                    append("<td>" + data.Id + "</td>").
                    append("<td>" + data.Name + "</td>").
                append("<td>" + data.Status + "</td>").
                append("<td>" + data.City + "</td>").
                append("</tr>");
        },

        error: errorHandler
    });
}
function putProduct() {
    var id = $("#productNumber").val();

    var data = new Object();
    data.name = $("#updateProductName").val();
    data.status = $("#updateProductStatus").val();
    data.city = $("#updateProductCity").val();

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
            alert('Элемент ' + id + ' изменен');
            getAll();            
        },

        error: errorHandler
    });
    $("#updateDiv").hide();
}

function showUpdateDiv() {

    var id = Number($("#productNumber").val());
    if(!isNaN(id) && id != 0){
        $.ajax({
            url: baseUri + "/" + id,
            type: "GET",
            beforeSend: function (xhr) {

                var token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (data) {

                $("#updateProductName").val(data.Name);
                $("#updateProductCity").val(data.City);
                $("#updateProductStatus").val(data.Status);
                $("#updateDiv").show();
            },
            error: errorHandler
        })    
    }

}

    function deleteProduct() {
        var id = $("#productNumber").val();

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
    }



