<?php
include 'connect.php';
$nickname = $_POST['nickname'];
$password = $_POST['password'];

$res = [];
//Получение пользователя с данными значением
$sql = "SELECT * FROM `users` WHERE nickname = '$nickname' AND password = md5(md5('$password')) ";
$SqlResult = $pdo->query($sql);

if ($SqlResult->rowCount() >= 1){
    $res['status'] = 0;
    $res['message'] = 'Авторизация прошла успешно';

    
    $SqlFetch = $SqlResult->fetch();
    $res['UserName'] = $SqlFetch['nickname'];
    $res['HashId'] = md5(md5($SqlFetch['id']));
    $res['UserAvatar'] = $SqlFetch['avatar'];
} else {
    $res['status'] = 1;
    $res['message'] = 'Авторизация не прошла';
}
echo json_encode($res, JSON_UNESCAPED_UNICODE);
