
function nav_side1(){
    var side_login=document.getElementById('side_login');
    var mybac=document.getElementById('bac-ss');
    side_login.style.width="30em";
    side_signup.style.width="0";
    mybac.style.display="block";
}
function mybacclick(){
	var side_login=document.getElementById('side_login');
    var mybac=document.getElementById('bac-ss');
    side_login.style.width="0";
    side_signup.style.width="0";
    mybac.style.display="none";
}
function nav_hidden(){
    var side_login=document.getElementById('side_login');
    var mybac=document.getElementById('bac-ss');
    side_login.style.width="0";
    side_signup.style.width="0";
    mybac.style.display="none";
}
function nav_side2(){
    var side_signup=document.getElementById('side_signup');
    var mybac=document.getElementById('bac-ss');
    side_signup.style.width="30em";
    side_login.style.width="0";
    mybac.style.display="block";
}