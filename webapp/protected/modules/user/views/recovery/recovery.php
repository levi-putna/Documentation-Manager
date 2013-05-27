<?php
$this->pageTitle = Yii::app()->name . ' - ' . UserModule::t("Restore");
?>



<?php
$bform = $this->beginWidget(
    'bootstrap.widgets.TbActiveForm',
    array(
         'id'          => 'verticalForm',
         'htmlOptions' => array(),
    )
); ?>

<h1 class="page-title">Forgot your password, lets see what we can do.</h1>

<div style="position: relative; top: auto; left: auto; right: auto; margin: 0 auto 20px; z-index: 1; max-width: 100%;"
     class="modal">
    <div class="modal-header">
        <h3>Recover Load Password</h3>
    </div>
    <div class="modal-body">

        <?php if (Yii::app()->user->hasFlash('recoveryMessage')): ?>
        <div class="success">
            <?php echo Yii::app()->user->getFlash('recoveryMessage'); ?>
        </div>
        <?php else: ?>

        <?php echo $bform->textFieldRow($form, 'login_or_email', array('hint' => 'Please enter your login username or email address and we will send you a new password.', 'class' => 'input-block-level')); ?>

        <?php endif; ?>


    </div>
    <div class="modal-footer">
        <?php $this->widget('bootstrap.widgets.TbButton', array('buttonType' => 'button', 'type' => 'danger', 'url' => Yii::app()->createUrl("/site/index"), 'label' => 'Cancel')); ?>
        <?php $this->widget('bootstrap.widgets.TbButton', array('buttonType' => 'submit', 'label' => 'Restore')); ?>
    </div>
</div>

<?php $this->endWidget(); ?>