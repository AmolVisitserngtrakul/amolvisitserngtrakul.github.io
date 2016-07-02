<?php
	require_once('../db.php');

	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);

		$db = new db();
		$response = array();

		$strSQL = "DELETE FROM `contract_data` WHERE contract = ".intval($request->contract);
		$db->query($strSQL);

		foreach ($request->data as &$value) {
		    $strSQL = "INSERT INTO `contract_data`(`contract`, `field`, `value`) VALUES ";
			$strSQL .="(".intval($request->contract).", '".$value->field."', '".mysql_real_escape_string($value->value)."') ";
			$db->query($strSQL);
			$response[] = $strSQL;
		}

		$db->close();
		echo json_encode($strSQL);
	}
?>

