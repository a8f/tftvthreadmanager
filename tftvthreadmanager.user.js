// ==UserScript==
// @name        TFTV Thread Hider
// @description Allows for hiding of threads on TFTV
// @namespace   deetr
// @include     /^https?:\/\/(www)?\.teamfortress\.tv\/threads.*$/
// @include     /^https?:\/\/(www)?\.teamfortress\.tv\/forum\/.*$/
// @version     1
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_getValue
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js
// @require     https://code.jquery.com/ui/1.11.4/jquery-ui.js
// ==/UserScript==
hideThreads();

// Add the hide thread button
var $hideButton = $('<input type="button" id="threadHideButton" value = "Hide Thread" class = "btn left submit" style="margin-left: 3px;">');
$hideButton.appendTo($('#filter-container'));
document.getElementById('threadHideButton').addEventListener("click", promptHideThread);

// Add the settings button
var $settingsButton = $('<a id="threadHideSettings">Unhide All Threads</a>');
$settingsButton.prependTo($('#user-menu'));
document.getElementById('threadHideSettings').addEventListener("click", openSettings);

function openSettings() {
    resetHiddenThreads();
}

function promptHideThread() {
    var thread = prompt("Enter a thread to hide");
    // Get the thread number
    thread = thread.replace(/[^\/\d]/g, '');
    var threadNo = 0;
    var threadSplit = thread.split("/");
    for (var i = 0; i < threadSplit.length; i++) {
        if (!threadSplit[i] == "") {
            threadNo = parseInt(threadSplit[i]);
            break;
        }
    }
    // Hide the thread
    addHiddenThread(threadNo);
    hideThreads();
}

function hideThreads() {
    var currentThread;
    var hiddenThreads = eval(GM_getValue("hiddenThreads", "[]"));
    if (hiddenThreads.length == 0) {
        return;
    }
    $('.thread').each(function(i, obj) {
            currentThread = $(this).find(':first-child').find(':first-child').attr('data-thread-id');
            if (hiddenThreads.indexOf(parseInt(currentThread)) > -1) {
                $(this).hide();
            }
    });
}

function addHiddenThread(threadNo) {
    var threadsHidden = eval(GM_getValue("hiddenThreads", "[]"));
    threadsHidden.push(threadNo);
    threadsHidden = $.unique(threadsHidden);
    GM_setValue("hiddenThreads", uneval(threadsHidden));
}

function removeHiddenThread(threadNo) {
    var threadsHidden = eval(GM_getValue("hiddenThreads", "[]"));
    var index = array.indexOf(threadNo);
    if (index > -1) {
        threadsHidden.splice(index, 1);
    }
    GM_setValue("hiddenThreads", uneval(threadsHidden));
}

function resetHiddenThreads() {
    GM_setValue("hiddenThreads", uneval([]));
    hideThreads();
      $('.thread').each(function(i, obj) {
            $(this).show();
    });
    alert('Unhid all threads!');
}