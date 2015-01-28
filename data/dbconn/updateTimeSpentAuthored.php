
<?php
/*
$myfile = fopen("/afs/csail.mit.edu/proj/tipsy/www/data/test/newfile.txt", "w");

print_r(error_get_last());
$userId = $_POST["userId"];
$totalTime = $_POST["time"];
fwrite($myfile, $userId);
fclose($myfile);

*/

$userId = $_POST["userId"];
$totalTime = $_POST["time"];

$conn = new mysqli("mysql.csail.mit.edu", "tipsy", "twmtiabp", "tipsy_data");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO timingData (userId, timeSpentAuthored) VALUES ('$userId','$totalTime') on DUPLICATE KEY UPDATE timeSpentAuthored=VALUES(timeSpentAuthored)";

if ($conn->query($sql) === TRUE) {
    echo "new recored created successfully";
} else {
    echo "error: " . $sql . "<br>" . $conn->error;
}
$conn->close();

print_r(error_get_last());
?>


