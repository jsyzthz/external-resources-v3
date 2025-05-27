/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    function menuPort() {
    return [
			['端口A', '1'],
			['端口B', '2'],
			['端口C', '3'],
			['端口D', '4'],
			['端口E', '5'],
			['端口F', '6']
		]
	}

	function menuPosition() {
		return [
			['左边', '1'],
			['中间', '2'],
			['右边', '3']
		]
	}

	function menuRGBIndex() {
		return [
			['1', '1'],
			['2', '2'],
			['3', '3'],
			['全部', '0']
		]
	}

	function menuLedStatus() {
		return [
			['开', '1'],
			['关', '0']
		]
	}
	 
	function menuFillMode(){
		return [
			['空心', '1'],
			['实心', '2']
		]
	}

	function menuFontSize(){
		return [
			['小', '1'],
			['中', '2'],
			['大', '3']
		]
	}


	function menuInfraredKeys (){
		return [
			['A', '3125149440'],
			['B', '3108437760'],
			['C', '3091726080'],
			['D', '3141861120'],
			['E', '3158572800'],
			['F', '4061003520'],
			['0', '3910598400'],
			['1', '4077715200'],
			['2', '3877175040'],
			['3', '2707357440'],
			['4', '4144561920'],
			['5', '3810328320'],
			['6', '2774204160'],
			['7', '3175284480'],
			['8', '2907897600'],
			['9', '3041591040'],
			['上', '3208707840'],
			['下', '3860463360'],
			['左', '4161273600'],
			['右', '4127850240'],
			['设置', '3927310080'],
		]
	}

	// 事件

	Blockly.Blocks['event_scratchstar_begin'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "event_scratchstar_begin",
				"message0": Blockly.Msg.SCRATCHSTAR_EVENT_BEGIN,
				"inputsInline": true,
				"nextStatement": null,
				"category": Blockly.Categories.event
			});
		}
	};

	//显示
	Blockly.Blocks['scratchstar_DisplayLEDDigital'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_DisplayLEDDigital",
				"message0": Blockly.Msg.SCRATCHSTAR_DISPLAY_LED_DIGITAL,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					},
					{
						"type": "input_value",
						"name": "value"
					}
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};
	Blockly.Blocks['scratchstar_DisplayLEDTimeDigital'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_DisplayLEDTimeDigital",
				"message0": Blockly.Msg.SCRATCHSTAR_DISPLAY_LED_TIME_DIGITAL,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					},
					{
						"type": "input_value",
						"name": "hourvalue"
					},
					{
						"type": "input_value",
						"name": "minvalue"
					}
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};
	Blockly.Blocks['scratchstar_ClearTFT'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_ClearTFT",
				"message0": Blockly.Msg.SCRATCHSTAR_CLEAR_TFT,
				"args0": [
					{
						"type": "input_value",
						"name": "COLOR"
					}
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};
	Blockly.Blocks['scratchstar_DrawText'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_DrawText",
				"message0": Blockly.Msg.SCRATCHSTAR_DRAW_TEXT,
				"args0": [
					{
						"type": "input_value",
						"name": "x"
					},
					{
						"type": "input_value",
						"name": "y"
					},
					{
						"type": "input_value",
						"name": "text"
					},
					{
						"type": "field_dropdown",
						"name": "size",
						"options": menuFontSize()
					},
					{
						"type": "input_value",
						"name": "COLOR"
					}
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};
	Blockly.Blocks['scratchstar_DrawPixel'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_DrawPixel",
				"message0": Blockly.Msg.SCRATCHSTAR_DRAW_PIXEL,
				"args0": [
					{
						"type": "input_value",
						"name": "x"
					},
					{
						"type": "input_value",
						"name": "y"
					},
					{
						"type": "input_value",
						"name": "COLOR"
					}
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};
	Blockly.Blocks['scratchstar_DrawLine'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_DrawLine",
				"message0": Blockly.Msg.SCRATCHSTAR_DRAW_LINE,
				"args0": [
					{
						"type": "input_value",
						"name": "sx"
					},
					{
						"type": "input_value",
						"name": "sy"
					},
					{
						"type": "input_value",
						"name": "ex"
					},
					{
						"type": "input_value",
						"name": "ey"
					},
					{
						"type": "input_value",
						"name": "COLOR"
					}
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};
	Blockly.Blocks['scratchstar_DrawRect'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_DrawRect",
				"message0": Blockly.Msg.SCRATCHSTAR_DRAW_RECT,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "mode",
						"options": menuFillMode()
					},
					{
						"type": "input_value",
						"name": "sx"
					},
					{
						"type": "input_value",
						"name": "sy"
					},
					{
						"type": "input_value",
						"name": "width"
					},
					{
						"type": "input_value",
						"name": "height"
					},
					{
						"type": "input_value",
						"name": "COLOR"
					}
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};

	Blockly.Blocks['scratchstar_DrawRoundRect'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_DrawRoundRect",
				"message0": Blockly.Msg.SCRATCHSTAR_DRAW_ROUND_RECT,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "mode",
						"options": menuFillMode()
					},
					{
						"type": "input_value",
						"name": "sx"
					},
					{
						"type": "input_value",
						"name": "sy"
					},
					{
						"type": "input_value",
						"name": "width"
					},
					{
						"type": "input_value",
						"name": "height"
					},
					{
						"type": "input_value",
						"name": "radius"
					},
					{
						"type": "input_value",
						"name": "COLOR"
					}
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};

	Blockly.Blocks['scratchstar_DrawCircle'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_DrawCircle",
				"message0": Blockly.Msg.SCRATCHSTAR_DRAW_CIRCLE,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "mode",
						"options": menuFillMode()
					},
					{
						"type": "input_value",
						"name": "cx"
					},
					{
						"type": "input_value",
						"name": "cy"
					},
					{
						"type": "input_value",
						"name": "radius"
					},
					{
						"type": "input_value",
						"name": "COLOR"
					}
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};
	Blockly.Blocks['scratchstar_DrawEllipse'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_DrawEllipse",
				"message0": Blockly.Msg.SCRATCHSTAR_DRAW_ELLIPSE,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "mode",
						"options": menuFillMode()
					},
					{
						"type": "input_value",
						"name": "cx"
					},
					{
						"type": "input_value",
						"name": "cy"
					},
					{
						"type": "input_value",
						"name": "longaxis"
					},
					{
						"type": "input_value",
						"name": "shortaxis"
					},
					{
						"type": "input_value",
						"name": "COLOR"
					}
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};
	Blockly.Blocks['scratchstar_DrawTriangle'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_DrawTriangle",
				"message0": Blockly.Msg.SCRATCHSTAR_DRAW_TRIANGLE,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "mode",
						"options": menuFillMode()
					},
					{
						"type": "input_value",
						"name": "ax"
					},
					{
						"type": "input_value",
						"name": "ay"
					},
					{
						"type": "input_value",
						"name": "bx"
					},
					{
						"type": "input_value",
						"name": "by"
					},
					{
						"type": "input_value",
						"name": "cx"
					},
					{
						"type": "input_value",
						"name": "cy"
					},
					{
						"type": "input_value",
						"name": "COLOR"
					}
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};

	// 传感器

	Blockly.Blocks['scratchstar_TouchBoardKey'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_TouchBoardKey",
				"message0": Blockly.Msg.SCRATCHSTAR_TOUCH_BOARD_KEY,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "position",
						"options": menuPosition()
					}
				],
				"inputsInline": true,
				"output": "Boolean",
				"outputShape": Blockly.OUTPUT_SHAPE_HEXAGONAL
			});
		}
	};

	Blockly.Blocks['scratchstar_TouchSwitch'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_TouchSwitch",
				"message0": Blockly.Msg.SCRATCHSTAR_TOUCH_SWITCH,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					}
				],
				"inputsInline": true,
				"output": "Boolean",
				"outputShape": Blockly.OUTPUT_SHAPE_HEXAGONAL
			});
		}
	};

	Blockly.Blocks['scratchstar_KeysPressed'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_KeysPressed",
				"message0": Blockly.Msg.SCRATCHSTAR_TOUCH_KEYS_PRESSED,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					},
					{
						"type": "field_dropdown",
						"name": "number",
						"options": [
							['1', '1'],
							['2', '2'],
							['3', '3'],
							['4', '4']
						]
					}
				],
				"inputsInline": true,
				"output": "Boolean",
				"outputShape": Blockly.OUTPUT_SHAPE_HEXAGONAL
			});
		}
	};

	Blockly.Blocks['scratchstar_GetUltrasonic'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_GetUltrasonic",
				"message0": Blockly.Msg.SCRATCHSTAR_GET_ULTRASONIC,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					}
				],
				"inputsInline": true,
				"output": "Number",
				"outputShape": Blockly.OUTPUT_SHAPE_ROUND
			});
		}
	};

	Blockly.Blocks['scratchstar_IRAvoidance'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_IRAvoidance",
				"message0": Blockly.Msg.SCRATCHSTAR_IR_AVOIDANCE,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					}
				],
				"inputsInline": true,
				"output": "Number",
				"outputShape": Blockly.OUTPUT_SHAPE_ROUND
			});
		}
	};

	Blockly.Blocks['scratchstar_isAvoidanceDetected'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_isAvoidanceDetected",
				"message0": Blockly.Msg.SCRATCHSTAR_IS_AVOIDANCE_DETECTED,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					},
					{
						"type": "input_value",
						"name": "threshold"
					}
				],
				"inputsInline": true,
				"output": "Boolean",
				"outputShape": Blockly.OUTPUT_SHAPE_HEXAGONAL
			});
		}
	};

	Blockly.Blocks['scratchstar_GetLigthValue'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_GetLigthValue",
				"message0": Blockly.Msg.SCRATCHSTAR_GET_LIGHT_VALUEE,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					}
				],
				"inputsInline": true,
				"output": "Number",
				"outputShape": Blockly.OUTPUT_SHAPE_ROUND
			});
		}
	};

	Blockly.Blocks['scratchstar_GetTemperature'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_GetTemperature",
				"message0": Blockly.Msg.SCRATCHSTAR_GET_TEMPERATURE,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					}
				],
				"inputsInline": true,
				"output": "Number",
				"outputShape": Blockly.OUTPUT_SHAPE_ROUND
			});
		}
	};

	Blockly.Blocks['scratchstar_GetHumidity'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_GetHumidity",
				"message0": Blockly.Msg.SCRATCHSTAR_GET_HUMIDITY,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					}
				],
				"inputsInline": true,
				"output": "Number",
				"outputShape": Blockly.OUTPUT_SHAPE_ROUND
			});
		}
	};

	Blockly.Blocks['scratchstar_GetSlideValue'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_GetSlideValue",
				"message0": Blockly.Msg.SCRATCHSTAR_GET_SLIDE_VALUE,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					}
				],
				"inputsInline": true,
				"output": "Number",
				"outputShape": Blockly.OUTPUT_SHAPE_ROUND
			});
		}
	};

	Blockly.Blocks['scratchstar_GetSoundValue'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_GetSoundValue",
				"message0": Blockly.Msg.SCRATCHSTAR_GET_SOUND_VALUE,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					}
				],
				"inputsInline": true,
				"output": "Number",
				"outputShape": Blockly.OUTPUT_SHAPE_ROUND
			});
		}
	};

	Blockly.Blocks['scratchstar_GrayScale'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_GrayScale",
				"message0": Blockly.Msg.SCRATCHSTAR_GRAY_SCALE,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					},
					{
						"type": "field_dropdown",
						"name": "secondary",
						"options": [
							['1', '1'],
							['2', '2'],
						]
					}
				],
				"inputsInline": true,
				"output": "Number",
				"outputShape": Blockly.OUTPUT_SHAPE_ROUND
			});
		}
	};

	Blockly.Blocks['scratchstar_GetJoystickXValue'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_GetJoystickXValue",
				"message0": Blockly.Msg.SCRATCHSTAR_GET_JOYSTICK_X_VALUE,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					}
				],
				"inputsInline": true,
				"output": "Number",
				"outputShape": Blockly.OUTPUT_SHAPE_ROUND
			});
		}
	};

	Blockly.Blocks['scratchstar_GetJoystickYValue'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_GetJoystickYValue",
				"message0": Blockly.Msg.SCRATCHSTAR_GET_JOYSTICK_Y_VALUE,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					}
				],
				"inputsInline": true,
				"output": "Number",
				"outputShape": Blockly.OUTPUT_SHAPE_ROUND
			});
		}
	};

	Blockly.Blocks['scratchstar_JoystickPressed'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_JoystickPressed",
				"message0": Blockly.Msg.SCRATCHSTAR_JOYSTICK_PRESSED,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					}
				],
				"inputsInline": true,
				"output": "Number",
				"outputShape": Blockly.OUTPUT_SHAPE_ROUND
			});
		}
	};

	Blockly.Blocks['scratchstar_ServoCurrentAngle'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_ServoCurrentAngle",
				"message0": Blockly.Msg.SCRATCHSTAR_SERVO_CURRENT_ANGLE,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					}
				],
				"inputsInline": true,
				"output": "Number",
				"outputShape": Blockly.OUTPUT_SHAPE_ROUND
			});
		}
	};

	Blockly.Blocks['scratchstar_GetReceivedCode'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_GetReceivedCode",
				"message0": Blockly.Msg.SCRATCHSTAR_GET_RECEIVED_CODE,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					}
				],
				"inputsInline": true,
				"output": "Number",
				"outputShape": Blockly.OUTPUT_SHAPE_ROUND
			});
		}
	};

	Blockly.Blocks['scratchstar_RemotePressed'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_RemotePressed",
				"message0": Blockly.Msg.SCRATCHSTAR_REMOTE_PRESSED,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					},
					{
						"type": "field_dropdown",
						"name": "key",
						"options": menuInfraredKeys()
					}
				],
				"inputsInline": true,
				"output": "Boolean",
				"outputShape": Blockly.OUTPUT_SHAPE_HEXAGONAL
			});
		}
	};

	Blockly.Blocks['scratchstar_GetRemoteCode'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_GetRemoteCode",
				"message0": Blockly.Msg.SCRATCHSTAR_GET_REMOTE_CODE,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "key",
						"options": menuInfraredKeys()
					}
				],
				"inputsInline": true,
				"output": "Number",
				"outputShape": Blockly.OUTPUT_SHAPE_ROUND
			});
		}
	};

	// 输出
	Blockly.Blocks['scratchstar_setRGBLed'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_setRGBLed",
				"message0": Blockly.Msg.SCRATCHSTAR_SET_RGB_LED,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					},
					{
						"type": "field_dropdown",
						"name": "index",
						"options": menuRGBIndex()
					},
					{
						"type": "input_value",
						"name": "red"
					},
					{
						"type": "input_value",
						"name": "green"
					},
					{
						"type": "input_value",
						"name": "blue"
					}
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};
	Blockly.Blocks['scratchstar_turnLed'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_turnLed",
				"message0": Blockly.Msg.SCRATCHSTAR_TURN_LED,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					},
					{
						"type": "field_dropdown",
						"name": "status",
						"options": menuLedStatus()
					},
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};

	Blockly.Blocks['scratchstar_BuzzerAlarm'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_BuzzerAlarm",
				"message0": Blockly.Msg.SCRATCHSTAR_BUZZER_ALARM,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					}
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};

	Blockly.Blocks['scratchstar_BuzzerStop'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_BuzzerStop",
				"message0": Blockly.Msg.SCRATCHSTAR_BUZZER_STOP,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					}
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};

	Blockly.Blocks['scratchstar_BuzzerRing'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_BuzzerRing",
				"message0": Blockly.Msg.SCRATCHSTAR_BUZZER_RING,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					},
					{
						"type": "input_value",
						"name": "value"
					},
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};

	Blockly.Blocks['scratchstar_BuzzerPlayNote'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_BuzzerPlayNote",
				"message0": Blockly.Msg.SCRATCHSTAR_BUZZER_PLAY_NOTE,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					},
					{
						"type": "field_dropdown",
						"name": "highvalue",
						"options": [
							['Bass', '0'],
							['Alto', '1'],
							['Treble', '3']
						]
					},
					{
						"type": "field_dropdown",
						"name": "note",
						"options": [
							['Do', '1'],
							['Re', '2'],
							['Mi', '3'],
							['Fa', '4'],
							['So', '5'],
							['La', '6'],
							['Xi', '7'],
							['Rest', '0']
						]
					},
					{
						"type": "field_dropdown",
						"name": "beat",
						"options": [
							['1', '1000'],
							['2', '2000'],
							['1/16', '62'],
							['1/8', '125'],
							['1/4', '250'],
							['3/8', '375'],
							['1/2', '500'],
							['5/8', '625'],
							['3/4', '750'],
							['7/8', '875']
						]
					}
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};

	Blockly.Blocks['scratchstar_IRSendCode'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_IRSendCode",
				"message0": Blockly.Msg.SCRATCHSTAR_IR_SEND_CODE,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					},
					{
						"type": "input_value",
						"name": "code"
					},
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};


	Blockly.Blocks['scratchstar_MotorForward'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_MotorForward",
				"message0": Blockly.Msg.SCRATCHSTAR_MOTOR_FORWARD,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					},
					{
						"type": "input_value",
						"name": "speed"
					},
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};

	Blockly.Blocks['scratchstar_MotorBackward'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_MotorBackward",
				"message0": Blockly.Msg.SCRATCHSTAR_MOTOR_BACKWARD,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					},
					{
						"type": "input_value",
						"name": "speed"
					},
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};
	Blockly.Blocks['scratchstar_MotorStop'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_MotorStop",
				"message0": Blockly.Msg.SCRATCHSTAR_MOTOR_STOP,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					}
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};

	Blockly.Blocks['scratchstar_ServoOutCircle'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_ServoOutCircle",
				"message0": Blockly.Msg.SCRATCHSTAR_SERVO_OUT_CIRCLE,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					},
					{
						"type": "input_value",
						"name": "circle"
					},
					{
						"type": "input_value",
						"name": "speed"
					}
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};

	Blockly.Blocks['scratchstar_ServoOutput'] = {
		/**
		 * enum of devices uses one pin
		 * @this Blockly.Block
		 */
		init: function () {
			this.jsonInit({
				"id": "scratchstar_ServoOutput",
				"message0": Blockly.Msg.SCRATCHSTAR_SERVO_OUTPUT,
				"args0": [
					{
						"type": "field_dropdown",
						"name": "port",
						"options": menuPort()
					},
					{
						"type": "input_value",
						"name": "angle"
					},
					{
						"type": "input_value",
						"name": "speed"
					}
				],
				"inputsInline": true,
				"previousStatement": null,
				"nextStatement": null
			});
		}
	};
    return Blockly;
}

exports = registerBlocks;