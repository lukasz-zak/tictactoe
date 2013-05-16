var TicTacToe = function () {
    var that = this;
    var placeForGameBoard = $('.game');
    var intro = $('.intro');
    that.turn = 0;
    that.arr = null;
    that.circleName = "";
    that.crossName = "";

    that.initArray = function () {
        that.arr = new Array(3);

        for (i = 0; i < 3; i++)
            that.arr[i] = new Array(3);
    };

    that.loadGameBoard = function () {
        $.ajax({
            url: 'gameTable.htm'
        }).done(function (data) {
            var $data = $(data);
            var turnDesc = $data.find("span.turnInfo");
            console.log($data.find('span'));

            $data.find('td').on('click', function () {
                if ($(this).hasClass('filled')) {
                    alert('field is filled');
                } else {
                    if (that.turn === 0) {
                        $(this).addClass('circle filled').attr("data-points", 1);
                        turnDesc.text("-------------->");
                    } else {
                        $(this).addClass('cross filled').attr("data-points", -1);
                        turnDesc.text("<--------------");
                    }
                    that.nextTurn();
                }
                that.checkResult();
            });
            intro.html('<span>Game is loading...</span>');
            intro.fadeOut('slow').delay(2000);

            $data.find('.circleDiv span').append(that.circleName);
            $data.find('.crossDiv span').append(that.crossName);

            placeForGameBoard.append($data);
        });
    };

    that.init = function () {
        that.initArray();

        $(".startGame").on('click', function () {
            that.circleName = intro.find('input.circleName').val();
            that.crossName = intro.find('input.crossName').val();

            that.loadGameBoard();
        });
    };

    that.nextTurn = function () {
        that.turn === 0
            ? that.turn = 1
            : that.turn = 0;

        $('.legendItem').each(function () {
            $(this).hasClass('active') === true
                ? $(this).removeClass('active')
                : $(this).addClass('active');
        });
    };

    that.checkResult = function () {
        $("table tr").each(function (i, val) {
            $(this).find('td').each(function (j, val2) {
                that.arr[i][j] = parseInt($(this).attr("data-points"));
            });
        });

        for (var i = 0; i < 3; i++) {
            var rowSum = 0;
            for (var j = 0; j < 3; j++) {
                rowSum += that.arr[i][j];
            }
            if (rowSum === 3)
                alert("Circle WIN!");
            else if (rowSum === -3)
                alert("Cross WIN!");
        }

        for (var i = 0; i < 3; i++) {
            var colSum = 0;
            for (var j = 0; j < 3; j++) {
                colSum += that.arr[j][i];
            }
            if (colSum === 3)
                alert("Circle WIN!");
            else if (colSum === -3)
                alert("Cross WIN!");
        }

        if (that.arr[0][0] + that.arr[1][1] + that.arr[2][2] === 3)
            alert("Circle WIN!");
        else if (that.arr[0][0] + that.arr[1][1] + that.arr[2][2] === -3)
            alert("Cross WIN!");

        if (that.arr[2][0] + that.arr[1][1] + that.arr[0][2] === 3)
            alert("Circle WIN!");
        else if (that.arr[2][0] + that.arr[1][1] + that.arr[0][2] === -3)
            alert("Cross WIN!");
    };

    that.init();
};