'use strict'

function saveToLocalStorage(key, objValue) {
    var json = JSON.stringify(objValue);
    localStorage.setItem(key, json);
}

function loadFromLocalStorage(key) {
    var stringJson = localStorage.getItem(key);
    var objValue = JSON.parse(stringJson);
    return objValue;
}