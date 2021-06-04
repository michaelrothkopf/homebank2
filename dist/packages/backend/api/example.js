"use strict";
module.exports = {
    path: "/example",
    method: 'post',
    disabled: true,
    route: (req, res) => {
        res.send({
            parameters: req.query,
            status: "Success!",
        });
    },
};
