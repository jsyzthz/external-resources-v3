/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_SCRATCHSTAR_CATEGORY_DISPLAY}" id="scratchstar_displays" colour="#774DCB" secondaryColour="#9966FF">
        <block type="scratchstar_DisplayLEDDigital">
            <field name="port">1</field>
            <value name="value">
                <shadow type="math_number">
                    <field name="NUM">8888</field>
                </shadow>
            </value>
        </block>
        <block type="scratchstar_DisplayLEDTimeDigital">
            <field name="port">1</field>
            <value name="hourvalue">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
            <value name="minvalue">
                <shadow type="math_number">
                    <field name="NUM">30</field>
                </shadow>
            </value>
        </block>
        <block type="scratchstar_ClearTFT">
            <value name="COLOR">
                <shadow type="colour_picker"></shadow>
            </value>
        </block>
        <block type="scratchstar_DrawText">
            <value name="x">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="y">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="text">
                <shadow type="text">
                    <field name="TEXT">Hello</field>
                </shadow>
            </value>
            <field name="size">1</field>
            <value name="COLOR">
                <shadow type="colour_picker"></shadow>
            </value>
        </block>
        <block type="scratchstar_DrawPixel">
            <value name="x">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="y">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="COLOR">
                <shadow type="colour_picker"></shadow>
            </value>
        </block>
        <block type="scratchstar_DrawLine">
            <value name="sx">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="sy">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="ex">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="ey">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="COLOR">
                <shadow type="colour_picker"></shadow>
            </value>
        </block>
        <block type="scratchstar_DrawRect">
            <field name="mode">1</field>
            <value name="sx">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="sy">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="width">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="height">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="COLOR">
                <shadow type="colour_picker"></shadow>
            </value>
        </block>
        <block type="scratchstar_DrawRoundRect">
            <field name="mode">1</field>
            <value name="sx">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="sy">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="width">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="height">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="radius">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="COLOR">
                <shadow type="colour_picker"></shadow>
            </value>
        </block>
        <block type="scratchstar_DrawCircle">
            <field name="mode">1</field>
            <value name="cx">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="cy">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="radius">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="COLOR">
                <shadow type="colour_picker"></shadow>
            </value>
        </block>
        <block type="scratchstar_DrawEllipse">
            <field name="mode">1</field>
            <value name="cx">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="cy">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="longaxis">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="shortaxis">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="COLOR">
                <shadow type="colour_picker"></shadow>
            </value>
        </block>
        <block type="scratchstar_DrawTriangle">
            <field name="mode">1</field>
            <value name="ax">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="ay">
               <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="bx">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="by">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="cx">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="cy">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="COLOR">
                <shadow type="colour_picker"></shadow>
            </value>
        </block>
</category>
<category name="%{BKY_SCRATCHSTAR_CATEGORY_SENSOR}" id="scratchstar_sensors" colour="#2E8EB8" secondaryColour="#4CBFEF">
        <block type="scratchstar_TouchBoardKey">
            <field name="position">1</field>
        </block>
        <block type="scratchstar_TouchSwitch">
            <field name="port">1</field>
        </block>
        <block type="scratchstar_KeysPressed">
            <field name="port">1</field>
            <field name="number">1</field>
        </block>
        <block type="scratchstar_GetUltrasonic">
            <field name="port">1</field>
        </block>
        <block type="scratchstar_IRAvoidance">
            <field name="port">1</field>
        </block>
        <block type="scratchstar_isAvoidanceDetected">
            <field name="port">1</field>
            <value name="threshold">
                <shadow type="math_number">
                    <field name="NUM">500</field>
                </shadow>
            </value>
        </block>
        <block type="scratchstar_GetLigthValue">
            <field name="port">1</field>
        </block>
        <block type="scratchstar_GetTemperature">
            <field name="port">1</field>
        </block>
        <block type="scratchstar_GetHumidity">
            <field name="port">1</field>
        </block>
        <block type="scratchstar_GetSlideValue">
            <field name="port">1</field>
        </block>
        <block type="scratchstar_GetSoundValue">
            <field name="port">1</field>
        </block>
        <block type="scratchstar_GrayScale">
            <field name="port">1</field>
            <field name="secondary">1</field>
        </block>
        <block type="scratchstar_GetJoystickXValue">
            <field name="port">1</field>
        </block>
        <block type="scratchstar_GetJoystickYValue">
            <field name="port">1</field>
        </block>
        <block type="scratchstar_JoystickPressed">
            <field name="port">1</field>
        </block>
        <block type="scratchstar_ServoCurrentAngle">
            <field name="port">1</field>
        </block>
        <block type="scratchstar_GetReceivedCode">
            <field name="port">1</field>
        </block>
        <block type="scratchstar_RemotePressed">
            <field name="port">1</field>
            <field name="key">3125149440</field>
        </block>
        <block type="scratchstar_GetRemoteCode">
            <field name="key">3125149440</field>
        </block>
</category>
<category name="%{BKY_SCRATCHSTAR_CATEGORY_OUTPUT}" id="scratchstar_outputs" colour="#BD42BD" secondaryColour="#D65CD6">
        <block type="scratchstar_setRGBLed">
            <field name="port">1</field>
            <field name="index">1</field>
            <value name="red">
                <shadow type="math_number">
                    <field name="NUM">255</field>
                </shadow>
            </value>
            <value name="green">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="blue">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="scratchstar_turnLed">
            <field name="port">1</field>
            <field name="status">1</field>
        </block>
        <block type="scratchstar_BuzzerAlarm">
            <field name="port">1</field>
        </block>
        <block type="scratchstar_BuzzerStop">
            <field name="port">1</field>
        </block>
        <block type="scratchstar_BuzzerRing">
            <field name="port">1</field>
            <value name="value">
                <shadow type="math_number">
                    <field name="NUM">440</field>
                </shadow>
            </value>
        </block>
        <block type="scratchstar_BuzzerPlayNote">
            <field name="port">1</field>
            <field name="highvalue">0</field>
            <field name="note">1</field>
            <field name="beat">1000</field>
        </block>
        <block type="scratchstar_IRSendCode">
            <field name="port">1</field>
            <value name="code">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="scratchstar_MotorForward">
            <field name="port">1</field>
            <value name="speed">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        <block type="scratchstar_MotorBackward">
            <field name="port">1</field>
            <value name="speed">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        <block type="scratchstar_MotorStop">
            <field name="port">1</field>
        </block>
        <block type="scratchstar_ServoOutCircle">
            <field name="port">1</field>
            <value name="circle">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="speed">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        <block type="scratchstar_ServoOutput">
            <field name="port">1</field>
            <value name="angle">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
            <value name="speed">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
</category>
`;
}
exports = registerToolboxs;
