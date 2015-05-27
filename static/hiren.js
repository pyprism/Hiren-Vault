/**
 * Created by prism on 5/27/15.
 */
/**
 * Created by prism on 10/5/14.
 */
$(document).ready(function() {
    $( "#generate" ).click(function() {
        var length = $('#range').val();
        var charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
        var retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        $('#inputPassword').val(retVal);
    });

});