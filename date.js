
exports.getDate = function () {

    const today = new Date();

    const dateFormatOpts = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    return today.toLocaleDateString("en-GB", dateFormatOpts);

}

exports.getDay = function () {

    const today = new Date();

    const dateFormatOpts = {
        weekday: "long"
    };

    return today.toLocaleDateString("en-GB", dateFormatOpts); 

}