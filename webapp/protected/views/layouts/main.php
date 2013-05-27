<?php /* @var $this Controller */ ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="language" content="en" />

	<title><?php echo CHtml::encode($this->pageTitle); ?></title>
</head>

<body>
	<?php echo $content; ?>

    <htmlpagefooter name="myFooter1">
        <table width="100%" style="vertical-align: bottom; font-family: serif; font-size: 8pt;
    color: #000000; font-weight: bold; font-style: italic;"><tr>
                <td width="33%"><span style="font-weight: bold; font-style: italic;">{DATE j-m-Y}</span></td>
                <td width="33%" align="center" style="font-weight: bold; font-style: italic;">{PAGENO}/{nbpg}</td>
                <td width="33%" style="text-align: right; ">My document</td>
            </tr></table>
    </htmlpagefooter>

    <sethtmlpagefooter name="MyFooter1" value="on" />
</body>


<!-- sets up the footer -->
</html>


