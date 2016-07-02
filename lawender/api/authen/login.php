<?php
	require_once('../db.php');

	function getGUID(){
	    if (function_exists('com_create_guid')){
	        return com_create_guid();
	    }
	    else {
	        mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
	        $charid = strtoupper(md5(uniqid(rand(), true)));
	        $hyphen = chr(45);// "-"
	        $uuid = substr($charid, 0, 8).$hyphen
	            .substr($charid, 8, 4).$hyphen
	            .substr($charid,12, 4).$hyphen
	            .substr($charid,16, 4).$hyphen
	            .substr($charid,20,12);
	            //chr(123)// "{"
	            //.chr(125);// "}"
	        return $uuid;
	    }
	}

	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);

		$email = $request->email;
		$password = $request->password;
		$guid = getGUID();
		$id = null;

		$db = new db();
		$data = new stdClass();

		$strSQL = "select user.id, role.role from `user` left join `role` on user.id = role.id ";
		$strSQL .= "where email = '".$email."' and password = '".$password."'";

		$objQuery = $db->query($strSQL);

		while($objResult = mysql_fetch_array($objQuery))
		{
			$data->userRole = $objResult['role'];
			$data->token = $guid;

			$id = $objResult['id'];
		}

		if ($data->userRole == 'user') {
			$strSQL = "INSERT INTO `token`(`id`, `token`) ";
			$strSQL .="VALUES ";
			$strSQL .="('".$id."','".$guid."') ";
			$db->query($strSQL);
		}

		$db->close();
		echo json_encode($data);
	}
?>

