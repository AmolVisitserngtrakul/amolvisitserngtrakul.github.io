<?php
	require_once('../db.php');

	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);

		$db = new db();
		$response = array();

		$strSQL = "SELECT * FROM `contract_data` WHERE contract = ".intval($request->id);
		$objQuery = $db->query($strSQL);

		while($objResult = mysql_fetch_array($objQuery))
		{
			$data = new stdClass();
			$data->field = $objResult['field'];
			$data->value = $objResult['value'];
			$response[] = $data;
		}

		$db->close();
		echo json_encode($response);
	}
?>