<link rel="stylesheet" href="<?php echo Yii::app()->request->baseUrl; ?>/css/loading.css" id="style">
<script src="<?php echo Yii::app()->request->baseUrl; ?>/js/loading.js"></script>

<!-- loading indicate -->
<section id="loading_container"class="loading-container">
    <div class="progress progress-striped active">
        <div id="bar" class="bar" style="width: 0%"></div>
    </div>
    <div class="message">Loading initial application...<div>
</section>

<!-- loading application css -->
<script language="JavaScript">load(20,'Downloading application theme...');</script>
<link rel="stylesheet" href="<?php echo Yii::app()->request->baseUrl; ?>/css/ext-theme-neptune-all.css">
<link rel="stylesheet" href="<?php echo Yii::app()->request->baseUrl; ?>/css/images.css" id="images">
<link rel="stylesheet" href="<?php echo Yii::app()->request->baseUrl; ?>/css/style.css" id="style">
<link rel="stylesheet" href="<?php echo Yii::app()->request->baseUrl; ?>/css/font-awesome.css" id="style">

<!-- loading extjs  -->
<script language="JavaScript">load(40,'Downloading application framework...');</script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/js/ace/ace.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/js/ext-all-debug.js"></script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/js/TreeCombo.js"></script>

<script language="JavaScript">load(60,'Configuring application layout...');</script>
<script src="<?php echo Yii::app()->request->baseUrl; ?>/js/ext-theme-neptune.js"></script>

<script language="JavaScript">load(80,'Downloading application up application...');</script>
<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/app.js"></script>

<script language="JavaScript">load(100,'Launching application...');</script>