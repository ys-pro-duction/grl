let haLoaded = false
$(document).ready(function () {
    if (haLoaded) return
    haLoaded = true
    timefunction();
    setInterval(timecountdown, 1000);
});

function GetDateTime() {
    const series = localStorage.series;
    const api_url = window.location.origin + "/homeDraw";

    let td = "";
    let im = 0;
    $.ajax({
        url: api_url, type: 'GET', crossOrigin: true, dataType: 'json', success: function (data) {
            $.each(data, function (key, item) {
                if (item.lname.toString() === "A") {
                    im = im + 1;
                }
            });
            im = im * 10.5;
            td = "<div class='divTable' style='overflow:auto;width:" + im + "%' >"
            td = td + "<div class=divTableBody>";
            const baseUrlLocImg = window.location.origin + "/images/golden bhavishya rashi images/"
            td = td + `<div class=divTableRow><div class=divTableCell1> <img alt="Golden Bhavishya Rashi Lottery" src='${baseUrlLocImg}time_1.png'   style='width:60px;height:40px'> </div>`
            let jm = 2;
            $.each(data, function (key, item) {
                if (item.lname.toString() == "A") {
                    if (jm >= 6) {
                        jm = 2;
                    }
                    if (jm % 2 == 0) {
                        td = td + `<div class=divTableCell1><div class=container1> <img alt="Golden Lottery Time ${item.drhrs + ":" + zeroPad(item.drmins, 2)}" src='${baseUrlLocImg}time_1.png'   style='width:60px;height:40px'> <div class=centered>` + item.drhrs + ":" + zeroPad(item.drmins, 2) + "</div></div></div>"
                    } else {
                        td = td + `<div class=divTableCell1><div class=container1> <img alt="Golden Lottery Time ${item.drhrs + ":" + zeroPad(item.drmins, 2)}" src='${baseUrlLocImg}time_2.png'   style='width:60px;height:40px'> <div class=centered>` + item.drhrs + ":" + zeroPad(item.drmins, 2) + "</div></div></div>"
                    }
                    jm = jm + 1;
                }
            });

            td = td + "</div><div class=divTableRow><div class=divTableCell1><img alt='Golden Bhavishya Rashi 60Subhank' src='601.png'  style= 'height:50px;width:50px;background-color:transparent'/></div>"
            $.each(data, function (key, item) {
                if (item.lname.toString() === "A") {
                    td = td + `<div class=divTableCell1><div class=container> <img alt='Golden Bhavishya Rashi 60Subhank - ${item.nosplayed}' src='${baseUrlLocImg}rnum.png'   style='width:60px;height:40px'> <div class=centered1>` + item.nosplayed + "</div></div></div>"
                }
            });

            td = td + "</div><div class=divTableRow> <div class=divTableCell1> <img alt='Golden Bhavishya Rashi 70Subhank' src='images/golden%20bhavishya%20rashi%20images/70gh.png'  style= 'height:50px;width:50px'/> </div>"
            $.each(data, function (key, item) {
                if (item.lname.toString() === "B") {
                    td = td + `<div class=divTableCell1><div class=container> <img alt='Golden Bhavishya Rashi 70Subhank - ${item.nosplayed}' src='${baseUrlLocImg}rnum.png'   style='width:60px;height:40px'> <div class=centered1>` + item.nosplayed + "</div></div></div>"
                }
            });
            td = td + "</div></div></div>"


            document.getElementById("dispres").innerHTML = td;
        }, error: function (request, message, error) {

        }
    });
}

function timefunction() {
    const api_url = window.location.origin + "/GetServerTime";
    $.ajax({
        url: api_url, type: 'GET', crossOrigin: true, dataType: 'json', success: function (data) {
            $.each(data, function (key, item) {
                document.getElementById('NextDrowTime').innerHTML = item.NextDrowTime;
                //  document.getElementById('LastDrawTime').innerHTML = item.LastDrawTime;
                document.getElementById('RemainTime').innerHTML = item.RemainTime;
                document.getElementById('NowTime').innerHTML = item.NowTime;
                document.getElementById('TodatyDate').innerHTML = item.TodatyDate;

                if (document.getElementById("NowTime").innerHTML === "00") {
                    disableall();
                }
                for (let i = 0; i < tickname.length; i++) {
                    const cur = document.getElementById("NowTime").innerHTML.split(' ');
                    const curt = cur[0].split(':');
                    let curhrs = 0;
                    if (cur[1] === "P.M.") {
                        curhrs = parseInt(curt[0]) + 12;
                    } else {
                        curhrs = curt[0];

                    }
                }
            })
        }, error: function (request, message, error) {
        }
    });

}

function timecountdown() {


    var time = document.getElementById('RemainTime').innerHTML;
    if (time != "Time Out") {
        var timearr = time.split(':')
        var h = timearr[0].trim();
        var m = timearr[1].trim();
        var s = timearr[2].trim();
        if (parseInt(s) > 0) {
            s = parseInt(s) - 1;
        } else {
            if (parseInt(m) > 0) {

                s = 59;
                m = parseInt(m) - 1;
            } else {
                if (parseInt(h) > 0) {
                    s = 59;
                    m = 59;
                    h = parseInt(h) - 1;
                } else {

                }
            }
        }
        if (h.toString().length < 2) h = "0" + h;
        if (m.toString().length < 2) m = "0" + m;
        if (s.toString().length < 2) s = "0" + s;
        document.getElementById('RemainTime').innerHTML = h + ":" + m + ":" + s;

        if (document.getElementById('RemainTime').innerHTML == "00:14:59") {

            //window.location.href = "sample.html";
            // GetDateTime();
            //myVar = setInterval(getres, 1000);
        }


        if (document.getElementById('RemainTime').innerHTML == "00:14:00") {

            // Getdrawres();
        }
    }
    var time1 = document.getElementById('NowTime').innerHTML;
    var timearr1 = time1.split(':')
    var h1 = timearr1[0].trim();
    var m1 = timearr1[1].trim();
    var s1 = timearr1[2].trim();
    var tsarr = s1.split(' ')
    s1 = tsarr[0].trim();
    var ts = tsarr[1].trim();
    if (parseInt(s1) < 60) {
        s1 = parseInt(s1) + 1;
        // alert(s);
    } else {
        if (parseInt(m1) < 59) {
            s1 = 0;
            m1 = parseInt(m1) + 1;
        } else {
            s1 = 0;
            m1 = 0;
            h1 = parseInt(h1) + 1;
        }
    }
    if (h1.toString().length < 2) h1 = "0" + h1;
    if (m1.toString().length < 2) m1 = "0" + m1;
    if (s1.toString().length < 2) s1 = "0" + s1;
    document.getElementById('NowTime').innerHTML = h1 + ":" + m1 + ":" + s1 + " " + ts;
    if ((m1 == 0 || m1 == 15 || m1 == 30 || m1 == 45) && (s1 == 2)) {
        GetDateTime()
        timefunction()
    }
}