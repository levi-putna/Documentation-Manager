<?php
$this->pageTitle = Yii::app()->name . ' | ' . UserModule::t("Registration");
?>



<?php
$form = $this->beginWidget(
    'bootstrap.widgets.TbActiveForm',
    array(
         'id' => 'verticalForm'
    )
); ?>

<h1 class="page-title">You’re minutes away from becoming a member.</h1>

<div style="position: relative; top: auto; left: auto; right: auto; margin: 0 auto 20px; z-index: 1; max-width: 100%;"
     class="modal">
    <div class="modal-header">
        <h3>Login</h3>
    </div>


    <div class="modal-body">



        <?php if (Yii::app()->user->hasFlash('loginMessage')): ?>
        <div class="alert alert-success">
            <?php echo Yii::app()->user->getFlash('loginMessage'); ?>
        </div>
        <?php endif; ?>

        <?php if (Yii::app()->user->hasFlash('registration')): ?>
        <div class="alert alert-success">
            <?=Yii::app()->user->getFlash('registration'); ?>
        </div>
        <?php else: ?>


        <?php echo $form->errorSummary($model); ?>

        <div class="row-fluid">
            <div class="span6">

                <?php echo $form->textFieldRow($model, 'username', array('label'=>'Username', 'size' => 60, 'maxlength' => 100)); ?>
                <?php echo $form->textFieldRow($model, 'email', array('label'=>'Email', 'size' => 60, 'maxlength' => 100)); ?>

                <?php echo $form->passwordFieldRow($model, 'password', array('label'=>'Password', 'size' => 60, 'maxlength' => 100)); ?>
                <?php echo $form->passwordFieldRow($model, 'verifyPassword', array('label'=>'Password Again', 'size' => 60, 'maxlength' => 100)); ?>

                <?php
                //Loop over the additional profile fields.
                $profileFields = Profile::getFields();
                if ($profileFields) {
                    foreach ($profileFields as $field) {
                        ?>

                        <?php
                        if ($widgetEdit = $field->widgetEdit($profile)) {
                            echo $widgetEdit;
                        } elseif ($field->range) {
                            echo $form->dropDownListRow($profile, $field->varname, rofile::range($field->range), array('multiple' => false));
                            //echo $form->dropDownList($profile, $field->varname, Profile::range($field->range));
                        } elseif ($field->field_type == "TEXT") {
                            echo $form->textAreaRow($profile, $field->varname, array('rows' => 6, 'cols' => 50));
                            //echo$form->textArea($profile, $field->varname, array('rows' => 6, 'cols' => 50));
                        } else {
                            echo $form->textFieldRow($profile, $field->varname, array('size' => 60, 'maxlength' => (($field->field_size) ? $field->field_size : 255)));
                        }
                    }
                }
                ?>

            </div>


        <div class="span6">
            <?php if (UserModule::doCaptcha('registration')): ?>

            <?php $this->widget('CCaptcha'); ?>
            <?php echo $form->textField($model, 'verifyCode'); ?>
            <?php echo $form->error($model, 'verifyCode'); ?>

            <p class="hint"><?php echo UserModule::t("Please enter the letters as they are shown in the image above."); ?>
                <br/><?php echo UserModule::t("Letters are not case-sensitive."); ?></p>
            <?php endif; ?>
        </div>

        <?php endif; ?>
    </div>
    </div>
    <div class="modal-footer">
        <?php $this->widget('bootstrap.widgets.TbButton', array('buttonType' => 'button', 'type' => 'danger', 'url' => Yii::app()->createUrl("/site/index"), 'label' => 'Cancel' )); ?>
        <?php $this->widget('bootstrap.widgets.TbButton', array('buttonType' => 'submit', 'type' => 'success', 'label' => 'Sighup', 'loadingText' => 'loading...')); ?>
    </div>
</div>

<?php $this->endWidget(); ?>