<?php
	class db
	{
		private $dbUrl = 'localhost';
		private $dbName = 'lawender';
		private $dbUser = 'root';
		private $dbPassword = 'mysql';
		private $objConnect = null;
		private $objDB = null;

		public function __construct()
		{
			$this->connect();
		}

		public function connect()
		{
			$this->objConnect = mysql_connect($this->dbUrl, $this->dbUser, $this->dbPassword) or die("Error Connect to Database");
			$this->objDB = mysql_select_db($this->dbName);
			mysql_query("SET character_set_results=utf8");//ตั้งค่าการดึงข้อมูลออกมาให้เป็น utf8
			mysql_query("SET character_set_client=utf8");//ตั้งค่าการส่งข้อมุลลงฐานข้อมูลออกมาให้เป็น utf8
			mysql_query("SET character_set_connection=utf8");//ตั้งค่าการติดต่อฐานข้อมูลให้เป็น utf8
		}

		public function close()
		{
			mysql_close($this->objConnect);
		}

		public function query($strSQL)
		{
			return mysql_query($strSQL);
		}
	}
?>