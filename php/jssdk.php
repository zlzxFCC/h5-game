<?php
class JSSDK {
    private $appId;
    private $appSecret;
    private $url;

    public function __construct($appId, $appSecret, $url) {
        $this->appId = $appId;
        $this->appSecret = $appSecret;
        $this->url = iconv("utf-8","gb2312",urldecode($url));
    }

    public function getSignPackage() {
        $jsapiTicket = $this->getJsApiTicket();
        $url = $this->url;
        $timestamp = time();
        $nonceStr = $this->createNonceStr();

        // 这里参数的顺序要按照 key 值 ASCII 码升序排序
        $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";

        $signature = sha1($string);

        $signPackage = array(
              "appId"     => $this->appId,
              "nonceStr"  => $nonceStr,
              "timestamp" => $timestamp,
              "url"       => $url,
              "signature" => $signature,
              "rawString" => $string,
              "jsapiTicket" =>  $jsapiTicket,
              "unionID"=>$_COOKIE["unionID"],
              'gameID'=>$_COOKIE["gameID"]

        );
        return $signPackage; 
    }

    private function createNonceStr($length = 16) {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $str = "";
        for ($i = 0; $i < $length; $i++) {
          $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
        }
        return $str;
    }

    private function getJsApiTicket() {
      $conn = mysql_connect("10.66.124.129:3306","dym_weixin_test","6yQI5rbJmihVZ91N") or die("connect failed" . mysql_error());
      mysql_select_db("dym_weixin_test", $conn);
      //正式
      // $sql="select jsTicket from app where wxId = 'wx9c41a48e2bf9f05b' limit 1";
      // 测试 
      $sql="select jsTicket from app where wxId = '". $this->appId ."' limit 1";
      $result = mysql_query($sql, $conn);
      if ($result){
          $ticket = mysql_fetch_row($result);
      }else{
          die("query failed");
      }
      mysql_free_result($result);
      mysql_close();
      return $ticket[0];
    }
}
 $jssdk = new JSSDK("wx5e5e76a6b89c50cb", "", $_GET['url']);
//$jssdk = new JSSDK("", "", $_GET['url']);
$signPackage = $jssdk->GetSignPackage();
$arr = array(
      'appId'=>$signPackage["appId"],
      'timestamp'=>$signPackage["timestamp"],
      'nonceStr'=>$signPackage["nonceStr"],
      'signature'=>$signPackage["signature"],
      'jsapiTicket'=>$signPackage["jsapiTicket"],
      'rawString'=>$signPackage["rawString"],
      'url'=>$signPackage["url"],
      'unionID'=>$_COOKIE["unionID"],
      'gameID'=>$_COOKIE["gameID"]
);
header('Content-Type:application/x-javascript;charset=utf-8');
echo 'var signPackage = ' . json_encode($arr) . ';';
?>