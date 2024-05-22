
function isNumber(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
        return false;
    return true;
}

function jodiArrowkey(c, e) {
  
    var keyCode = (e.which) ? e.which : e.keyCode;
    var x = 0;
    var y = 0;
    var BoxArray = new Array(100);
    var i = 1;
    for (i = 0; i < 100; i++) {
        BoxArray[i] = "t_" + i;
    }
    if (keyCode == 37) {
        c = parseInt(c) - 1;
        if (c >= 0)
            document.getElementById(BoxArray[c]).focus();
        else
            document.getElementById(BoxArray[35]).focus();
    }
    if (keyCode == 38) {
        c = parseInt(c) - 10;
        if (c <= 99)
            document.getElementById(BoxArray[c]).focus();
        else
            document.getElementById(BoxArray[0]).focus();
    }
    //right
    if (keyCode == 39) {
        c = parseInt(c) + 1;
        if (c <= 99)
            document.getElementById(BoxArray[c]).focus();
        if (c == 100)
            document.getElementById(BoxArray[0]).focus();
    }
    if (keyCode == 40) {
        c = parseInt(c) + 10;
        if (c <= 99)
            document.getElementById(BoxArray[c]).focus();
        if (c == 100)
            document.getElementById(BoxArray[0]).focus();
    }
}
function jodiCArrowkey(c, e) {
    
    var keyCode = (e.which) ? e.which : e.keyCode;
    var x = 0;
    var y = 0;
    var BoxArray = new Array(10);
    var i = 1;
    for (i = 0; i < 10; i++) {
        BoxArray[i] = "t_c" + i;
    }
    //alert(keyCode);
    //left
    if (keyCode == 37) {
        c = parseInt(c) - 1;
        if (c >= 0)
            document.getElementById(BoxArray[c]).focus();
        else
            document.getElementById("t_r0").focus();
    }
    //right
    if (keyCode == 39) {
        c = parseInt(c) + 1;
        if (c <= 9)
            document.getElementById(BoxArray[c]).focus();
        if (c == 10)
            document.getElementById(BoxArray[0]).focus();
    }

}
function jodiRArrowkey(c, e) {
    
    var keyCode = (e.which) ? e.which : e.keyCode;
    var x = 0;
    var y = 0;
    var BoxArray = new Array(10);
    var i = 1;
    for (i = 0; i < 10; i++) {
        BoxArray[i] = "t_r" + i;
    }
    // alert(keyCode);
    //left
    if (keyCode == 38) {
        c = parseInt(c) - 1;
        if (c >= 0)
            document.getElementById(BoxArray[c]).focus();
        else
            document.getElementById("t_c0").focus();
    }
    //right
    if (keyCode == 40) {
        c = parseInt(c) + 1;
        if (c <= 9)
            document.getElementById(BoxArray[c]).focus();
        if (c == 10)
            document.getElementById(BoxArray[0]).focus();
    }
}
function jodiCalc() {
    totdraw = 0;
    
    var totdsel ;
    if (seldraw != null) {
        totdsel = seldraw.toString().split(',');
        totdraw = totdsel.length

    }
    
    document.getElementById('tcheck').value = totdraw;
    if (totdraw <= 0)
        totdraw = 1;
    var jdbetcount = "";
    var x1 = 0;
    var y1 = 0;
    var jdtr = new Array(10);
    var index = 0;
    var counter = 0;
    var JodiTQ = 0, JodiTA = 0, JodiTR = 0;
    var tonos = "";
    for (var allser = 1; allser <= 10; allser++) {
        if (document.getElementById('s' + allser).checked == true) {
            for (var i = 0; i <= 99; i++) {
                value = document.getElementById('t_' + i).value;
               tonos= document.getElementById('s_' + i).innerHTML;
                var fnx = 0;
                $.each(storenum, function (key, item) {
                    if (item.num == tonos) {
                        item.qty = value;
                        fnx = 1;
                    }
                    
                    

                    
                });

                if (fnx == 0) {
                    storenum.push({ num: tonos, qty: value })
                }     

                var temp1 = parseInt(value);
                if (!isNaN(temp1)) {
                    x1 = value;
                    if (document.getElementById('chkindiv').checked == true) {
                    var series = localStorage.series;
                    setindivser = series;
                        }
                    y1 = parseInt(y1) + parseInt(x1);
                }
                else
                    document.getElementById('t_' + i).value = "";

            }
        }
    }
    if (document.getElementById("chkgnameall").checked == true) {
        for (var i = 1; i <= 10; i++) {
            if (document.getElementById('chkgname' + i).checked == true) {
                jdbetcount = jdbetcount + i + ",";
                JodiTQ = JodiTQ + y1;
                JodiTA = parseFloat(JodiTQ * document.getElementById('hd_jdtr').value).toFixed(2);
                document.getElementById('lbl_jdqty' + i).innerHTML = y1;
                document.getElementById('lbl_jdamt' + i).innerHTML = parseFloat(y1 * document.getElementById('hd_jdtr').value).toFixed(2);
            }
            else {
                document.getElementById('lbl_jdqty' + i).innerHTML = "0";
                document.getElementById('lbl_jdamt' + i).innerHTML = "0";
            }
        }
    }
    else
        for (var i = 1; i <= 10; i++) {
            if (document.getElementById('chkgname' + i).checked == true) {
                jdbetcount = jdbetcount + i + ",";
                JodiTQ = JodiTQ + y1;
                JodiTA = parseFloat(JodiTQ * document.getElementById('hd_jdtr').value).toFixed(2);
                document.getElementById('lbl_jdqty' + i).innerHTML = y1;
                document.getElementById('lbl_jdamt' + i).innerHTML = parseFloat(y1 * document.getElementById('hd_jdtr').value).toFixed(2);
            }
            else {
                document.getElementById('lbl_jdqty' + i).innerHTML = "0";
                document.getElementById('lbl_jdamt' + i).innerHTML = "0";
            }
        }



    document.getElementById('lbl_jdqty').innerHTML = parseInt( JodiTQ)*parseInt( totdraw);
    document.getElementById('lbl_jdamt').innerHTML = (parseInt(JodiTA) * parseInt(totdraw)).toString() + ".00";
    if (document.getElementById("chkindiv").checked == true) {
    
    jodiCalcindiv();
    }
}



function jodiCalcindiv() {
    totdraw = 0;

    var totdsel;
    if (seldraw != null) {
        totdsel = seldraw.toString().split(',');
        totdraw = totdsel.length

    }
    document.getElementById('tcheck').value = totdraw;
    if (totdraw <= 0)
        totdraw = 1;
    var jdbetcount = "";
    var x1 = 0;
    var y1 = 0;
    var jdtr = new Array(10);
    var index = 0;
    var counter = 0;
    var JodiTQ = 0, JodiTA = 0, JodiTR = 0;
    var tonos = "";
    for (var i = 1; i <= 10; i++) {
        document.getElementById('lbl_jdqty' + i).innerHTML = "0";
        document.getElementById('lbl_jdamt' + i).innerHTML = "0";

    }
    
                 var fnx = 0;
                 $.each(storenum, function (key, item) {
                     value = item.qty;
                     fnx = 1;







                     var temp1 = parseInt(value);
                     if (!isNaN(temp1)) {
                         x1 = value;
                         y1 = parseInt(y1) + parseInt(x1);
                         var numx = parseInt(item.num[1]) + 1;
                         document.getElementById('lbl_jdqty' + numx).innerHTML = parseInt(document.getElementById('lbl_jdqty' + numx).innerHTML) + parseInt(x1);
                         document.getElementById('lbl_jdamt' + numx).innerHTML = parseFloat(parseFloat(document.getElementById('lbl_jdqty' + numx).innerHTML) * parseFloat(2)).toFixed(2);
                     }


                 });
                 for (var i = 1; i <= 10; i++) {
                     JodiTQ = JodiTQ + parseFloat(document.getElementById('lbl_jdqty' + i).innerHTML);
                 }
                  
                      

    document.getElementById('lbl_jdqty').innerHTML = parseInt(JodiTQ) * parseInt(totdraw);
    document.getElementById('lbl_jdamt').innerHTML = (parseFloat(JodiTQ) * 2 * parseFloat(totdraw)).toString() + ".00";


}
function ckindivblock()
{
var vm=0;
 for (var vx = 0; vx <100; ) {

                var fndblock = 0;
                var fndval = "t_" + vx.toString();
                var tval = document.getElementById(fndval).value;
                for (var vt = 0; vt <= 9; vt++) {
                   
                    fndval = "t_" + (vx+vt).toString();
                    if (document.getElementById(fndval).value != tval) {
                        fndblock = 1;
                        break;
                    }
                }
                if (fndblock  == 0) {
                    document.getElementById('t_r' + vm).value = tval;
                }
                vx = vx + 10;
vm=vm+1;
            }

}
function selectAlljodi() {
    var selval = document.getElementById("chkgnameall").checked;
    for (var x = 1; x <= 10; x++) {
        document.getElementById("chkgname" + x).checked = selval;
    }
    if (document.getElementById("chkgnameall").checked == false) {
        for (i = 0; i < 100; i++) {
            document.getElementById('t_' + i).value = "";
        }
        for (var i = 1; i <= 10; i++) {
            document.getElementById('lbl_jdqty' + i).innerHTML = "0";
            document.getElementById('lbl_jdamt' + i).innerHTML = "0";
        }
    }
    jodiCalc();
}


function changsser() {
    var fnd = 0;
    for (var tt = 1; tt < 10; tt++) {
        if (document.getElementById('chkgname' + tt).checked == false) {
            fnd = 1;
        }
    }
    if (fnd == 1) {
        document.getElementById('Chkallg').checked = false;
    }
    else {
        document.getElementById('Chkallg').checked = true;
    }
    fnd = 0;
    for (var tt = 1; tt <= 10; tt++) {
        if (document.getElementById('chkgname' + tt).checked ==true) {
            fnd = 1;
        }
    }
    if (fnd == 0) {
        document.getElementById('chkgname1').checked = true;
        changsser();
    }
}
var oldsel = [];
oldsel.push(1);
function selectSjodi(chser) {
    var iser = parseInt(chser) - 1;
    if (document.getElementById("chkindiv").checked == true) {
        for (var i = 0; i < 10; i++)
        {
            document.getElementById('t_c' + i).value = "";
        document.getElementById('t_r' + i).value = "";
        }
    }
    if (document.getElementById('chkgname' + chser).checked == false) {
    
    }
    else {
    var fndx=0;
    for (var i = 0; i < oldsel.length; i++) {
        if (oldsel[i] == iser) {

            fndx = 1;
        }
    }
        if(fndx==0)
        {
        oldsel.push(iser);
        }
        localStorage.setItem("rseries", iser);
        localStorage.setItem("lname", document.getElementById('lbl_g' + iser).innerHTML);
        changeseries(chser);
    }

    if (document.getElementById("chkindiv").checked == true) {
        chkrser();
    }
    changsser();
    jodiCalc();
}
function jodiRCalc(id) {
    var x1 = 0;
    var y1 = 0;
    var counter = 0;
    var index = id;
    var tr = 0;
    var value = document.getElementById('t_r' + id).value

   
    if (value == "") {
        for (var j = 0; j < 10; ) {
            var tempindex = (j +id * 10);
            document.getElementById('t_' + tempindex).value = "";
           if( parseInt( document.getElementById('t_c' + j).value) >0)
           {
               document.getElementById('t_' + tempindex).value = document.getElementById('t_c' + j).value;
           }
            j = j + 1;
         
        }
       
    }
    
    if (value1 == "")
        value1 = 0;
    //index = index - 10;
    //alert(index);
    if (index < 10) {
        for (var j = 0; j < 10; ) {
            var value1 = document.getElementById('t_c' + tr).value;
            if (value1 == "") {
                value1 = 0;
            }
            var tempindex = (j + index * 10);
            //alert(tempindex);
            var lastval = document.getElementById('t_' + tempindex).value;
            if (!isNaN(parseInt(lastval)) && !isNaN(parseInt(value))) {
                var sum = parseInt(value) + parseInt(value1);
                //var sum = parseInt(value) + parseInt(lastval);
                document.getElementById('t_' + tempindex).value = sum;
            }
            else if (!isNaN(parseInt(value)) && value != "") {
                document.getElementById('t_' + tempindex).value = value;
            }
            if (document.getElementById('t_' + tempindex).disabled == true)
                document.getElementById('t_' + tempindex).value = "";
            j = j + 1;
            tr = tr + 1;
        }
    }
    //document.getElementById('t_r' + id).value = "";
    jodiCalc();
}
var series = "00"
function changeseries(id) {
    var series = localStorage.series;
    var rseries = localStorage.rseries;
    id = series + rseries;
    GetDateTime();
    for (var j = 0; j < 100; ) {
        if (j < 10) {
            document.getElementById('s_' + j).innerHTML = id + "0" + j;
             

        }
        else {
            document.getElementById('s_' + j).innerHTML = id + "" + j;
        }
        if (document.getElementById("chkindiv").checked == true) {
            var fnx = 0;
            $.each(storenum, function (key, item) {
                if (item.num == document.getElementById('s_' + j).innerHTML) {
                    fnx = 1;
                    document.getElementById('t_' + j).value = item.qty;
                }


            });
            if (fnx == 0) {
                document.getElementById('t_' + j).value = "";
            }
           
        }
        j++;
    }

}

function jodiCCalc(id) {
    var x1 = 0;
    var y1 = 0;
    var counter = 0;
    var index = id;
    var value = document.getElementById('t_c' + id).value
    var r1 = 0;
    if (value == "") {
        for (var j = 0; j < 100; ) {
            var tempindex = (j + id);
            document.getElementById('t_' + tempindex).value = "";
            if (parseInt(document.getElementById('t_r' + r1).value) > 0) {
                document.getElementById('t_' + tempindex).value = document.getElementById('t_r' + r1).value;
            }
            j = j + 10;
            r1 = r1 + 1;
        }
         
       
    }
    var tr = 0;
    //index = index - 10;
    //alert(index);
    if (index < 10) {
        for (var j = 0; j < 100;) {
            var tempindex = (j + id);

            // alert(tempindex);
            var lastval = document.getElementById('t_' + tempindex).value;
            var value1 = document.getElementById('t_r' + tr).value;

            if (value1 == "")
                value1 = 0;
            

            
            if (!isNaN(parseInt(lastval)) && !isNaN(parseInt(value))) {
                var sum = parseInt(value) + parseInt(value1);
                //var sum = parseInt(value) + parseInt(lastval);
                document.getElementById('t_' + tempindex).value = sum;
            }
            else if (!isNaN(parseInt(value)) && value != "") {
                document.getElementById('t_' + tempindex).value = value;
            }
            if (document.getElementById('t_' + tempindex).disabled == true)
                document.getElementById('t_' + tempindex).value = "";
            j = j + 10;
            tr = tr + 1;
        }
    }
    //document.getElementById('t_c' + id).value = "";
    jodiCalc();
}
function Clear() {
    storenum = [];
    setindivser = "";
    document.getElementById("chkindiv").disabled = false;
    document.getElementById("chkindiv").checked = true;
    for (i = 0; i < 100; i++) {
        document.getElementById('t_' + i).value = "";
    }
    for (i = 0; i < 10; i++) {
        document.getElementById('t_c' + i).value = "";
        document.getElementById('t_r' + i).value = "";
    }
    if (series == undefined) {

        localStorage.setItem("series", initlocalser);
    }
    if (rseries == undefined) {
         
        localStorage.setItem("rseries", "0");
    }
    localStorage.setItem("series", initlocalser);
    localStorage.setItem("rseries", "0");
    var series = localStorage.series;
    var rseries = localStorage.rseries;
    var chser = series + rseries;
    changeseries(chser);
    chkrser();
    for (var i = 1; i <= 10; i++) {
        document.getElementById("s" + i).checked = false;
    }
    //document.getElementById("s1").checked = true;
    document.getElementById(initser).checked = true;  
    document.getElementById('chkgnameall').checked = false;
    document.getElementById("Chkallg").checked = false;
  
    if (parseInt(document.getElementById("tcheck").value) > 1) {
        resetdraw();
    }
    
    document.getElementById("tcheck").value = 1;
    jodiCalc();
   // resetdraw();
}


function disableall() {
  }

function enableall() {
    for (i = 0; i < 100; i++) {
        document.getElementById('t_' + i).disabled = false;
    }
    for (i = 0; i < 10; i++) {
        document.getElementById('t_c' + i).disabled = false;
        document.getElementById('t_r' + i).disabled = false;
    }

    for (var i = 1; i <= 10; i++) {
        document.getElementById("s" + i).disabled = false;
        document.getElementById("chkgname" + i).disabled = false;
    }
    
    document.getElementById("t_claim").disabled = false;
    document.getElementById("bt_cancel").disabled = false;
    document.getElementById("Button5").disabled = false;
    document.getElementById("Button4").disabled = false;
    document.getElementById("Button1").disabled = false;
    document.getElementById("Button3").disabled = false;
    document.getElementById("Button2").disabled = false;
    document.getElementById("Button6").disabled = false;
    document.getElementById("bt_login").disabled = false;
    document.getElementById("chkgnameall").disabled = false;
    document.getElementById("Chkallg").disabled = false;
    var btn = document.getElementById("btnsubmit");
    document.getElementById("ms").enabled = true;
    btn.disabled = false;
}


