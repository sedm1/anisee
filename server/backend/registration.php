<?php 
include 'connect.php';

$name = $_POST['nickname'];
$email = $_POST['email'];
$password = md5(md5($_POST['password']));

$res = [];
$res['status'] = 0; //0 - все ок, 1 - есть пользователь, 2 - ошибка на сервере
$res['mes'] = '';


//Проверка на существование пользователя
$sql = "SELECT * FROM `users` WHERE nickname = '$name' or email = '$email'";

$SqlResult = $pdo->query($sql);
if ($SqlResult->fetchColumn() > 0){
    $res['status'] = 1;
    $res['mes'] = 'Пользователи с таким Nickname или Email уже существуют';
    echo json_encode($res);
    exit();
} 
//Регистрация пользователя
$sql = "INSERT INTO `users`(`nickname`, `email`, `password`) VALUES ('$name','$email','$password')";

$SqlResult = $pdo->query($sql);
if ($SqlResult){
    $res['status'] = 0;
    $res['mes'] = 'Все ок';
} else {
    $res['status'] = 2;
    $res['mes'] = 'Ошибка при отправке данных';
}

//Получаем Id добавленного пользователя
$sql = "SELECT id, nickname FROM `users` WHERE nickname = '$name'";
$SqlResult = $pdo->query($sql);
if ($SqlResult){
    $res['status'] = 0;
    $res['mes'] = 'Все ок';
    $SqlFetch = $SqlResult->fetch();

    $res['UserName'] = $SqlFetch['nickname'];
    $res['HashId'] = md5(md5($SqlFetch['id']));

} else {
    $res['status'] = 2;
    $res['mes'] = 'Ошибка при отправке данных';
    exit();
}
echo json_encode($res);

