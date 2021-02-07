<?php

$EmailTo = "gabrieldincu@outlook.com";
$Subject = "EVCharge contact form message";
$FirstName = Trim(stripslashes($_POST['form_name']));
$LastName = Trim(stripslashes($_POST['form_lastname']));
$Email = Trim(stripslashes($_POST['form_email']));
$Need = Trim(stripslashes($_POST['form_need']));
$Message = Trim(stripslashes($_POST['form_message'])); 

// prepare email body text
$Body = "";
$Body .= "$FirstName: ";
$Body .= $FirstName;
$Body .= "\n";
$Body .= "$LastName: ";
$Body .= $LastName;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $Email;
$Body .= "\n";
$Body .= "$Need: ";
$Body .= $Need;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $Message;
$Body .= "\n";

// send email 
$success = mail($EmailTo, $Subject, $Body);

if (!$success) {
    $errorMessage = error_get_last()['message'];
    http_response_code(500);
}
else {
  print "Message sent!"
}

?>
