const showAlert = () => {
    $("#alert-error").show('fade');

    setTimeout(() => {
        $("#alert-error").hide('fade');
    }, 4000)
}