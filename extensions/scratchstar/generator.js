/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

const CHIP_IO = [
    [0x02, 0x03, 0x36, 0x37],
    [0x04, 0x05, 0x38, 0x39],
    [0x06, 0x07, 0x3a, 0x3b],
    [0x08, 0x09, 0x3c, 0x3d],
    [0x0a, 0x0b, 0x3e, 0x3f],
    [0x0c, 0x0d, 0x40, 0x41],
    [0x18, 0x17, 0x16],
];

function port2pin(port, index) {
    return CHIP_IO[parseInt(port) - 1][parseInt(index) - 1];
}

function hexToRgb(hex) {
  // Remove the # if present
  hex = hex.replace('#', '');
  
  // Parse the hex values to get r, g, b components
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);
  
  return {r: r, g: g, b: b};
}



function registerGenerators(Blockly) {
    //自定义积木生成代码

    //四位数码管
    Blockly.Arduino["scratchstar_DisplayLEDDigital"] = function (block) {
        var order = Blockly.Arduino.ORDER_NONE;
        const port = block.getFieldValue("port");
        const value = Blockly.Arduino.valueToCode(block, "value", order);
        const clk = port2pin(port, 1); //这里的1是表示每个TYPE-C有多个引脚，这里的表示每个TYPEC引脚中的第一个引脚
        const dio = port2pin(port, 2); //这里的2是表示每个TYPE-C有多个引脚，这里的表示每个TYPEC引脚中的第二个引脚
        Blockly.Arduino.includes_["SevenSegmentTM1637"] =
            "#include <SevenSegmentTM1637.h>\n#include <SevenSegmentExtended.h>";

        Blockly.Arduino.definitions_[
            "SevenSegmentTM1637" + port
        ] = `SevenSegmentExtended segmentDisplay${port}(${clk}, ${dio});`;

        Blockly.Arduino.setups_[
            "SevenSegmentTM1637" + port
        ] = `segmentDisplay${port}.begin();`;

        return `segmentDisplay${port}.printNumber(${value}, true, false, true);\n`;
    };




//四位数码管时间
Blockly.Arduino['scratchstar_DisplayLEDTimeDigital'] = function (block) {
  var order = Blockly.Arduino.ORDER_NONE;
  const port = block.getFieldValue('port')
  const hourvalue = Blockly.Arduino.valueToCode(block, 'hourvalue', order);
  const minvalue = Blockly.Arduino.valueToCode(block, 'minvalue', order);
  const clk = port2pin(port, 1) //这里的1是表示每个TYPE-C有多个引脚，这里的表示每个TYPEC引脚中的第一个引脚
  const dio = port2pin(port, 2) //这里的2是表示每个TYPE-C有多个引脚，这里的表示每个TYPEC引脚中的第二个引脚
  Blockly.Arduino.includes_["SevenSegmentTM1637"] = "#include <SevenSegmentTM1637.h>\n#include <SevenSegmentExtended.h>";
  
  Blockly.Arduino.definitions_["SevenSegmentTM1637" + port] = `SevenSegmentExtended segmentDisplay${port}(${clk}, ${dio});`;

  Blockly.Arduino.setups_['SevenSegmentTM1637' + port] = `segmentDisplay${port}.begin();`;

  return `segmentDisplay${port}.printTime(${hourvalue}, ${minvalue}, true);\n`;
}

//屏幕显示
Blockly.Arduino['scratchstar_ClearTFT'] = function (block) {

  var colour = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE);
  // Convert hex color to RGB if needed
  var rgbColor = hexToRgb(colour);

  Blockly.Arduino.includes_["TFT"] = "#include <U8g2lib.h>\n#include <Arduino_GFX_Library.h>";
  
  Blockly.Arduino.definitions_["TFT"] = "Arduino_DataBus *bus = new Arduino_HWSPI(25 /* DC */, 26 /* CS */);\nArduino_GFX *gfx = new Arduino_ST7789(bus, 27 /* RST */, 0 /* rotation */);";

  Blockly.Arduino.setups_['TFT'] = "gfx->begin();\n  gfx->invertDisplay(true);";

  return `gfx->fillScreen(RGB565(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}));\n`;
}

//屏幕显示文字
Blockly.Arduino['scratchstar_DrawText'] = function (block) {
  var order = Blockly.Arduino.ORDER_NONE;
  var x = Blockly.Arduino.valueToCode(block, 'x', order);
  var y = Blockly.Arduino.valueToCode(block, 'y', order);
  var text = Blockly.Arduino.valueToCode(block, 'text', order);
  var size = block.getFieldValue('size');
  var colour = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE);
  
  // Convert hex color to RGB
  var rgbColor = hexToRgb(colour);
  
  Blockly.Arduino.includes_["TFT"] = "#include <U8g2lib.h>\n#include <Arduino_GFX_Library.h>";
  
  Blockly.Arduino.definitions_["TFT"] = "Arduino_DataBus *bus = new Arduino_HWSPI(25 /* DC */, 26 /* CS */);\nArduino_GFX *gfx = new Arduino_ST7789(bus, 27 /* RST */, 0 /* rotation */);";

  Blockly.Arduino.setups_['TFT'] = "gfx->begin();\n  gfx->invertDisplay(true);";

  var code = `gfx->setTextSize(${size});\n`+
  `gfx->setTextColor(RGB565(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}));\n`+
  `gfx->setCursor(${x}, ${y});\n`+
  `gfx->print(${text});\n`; 
  return code;
}
//画点
Blockly.Arduino['scratchstar_DrawPixel'] = function (block) {
  var x = Blockly.Arduino.valueToCode(block, 'x', Blockly.Arduino.ORDER_NONE);
  var y = Blockly.Arduino.valueToCode(block, 'y', Blockly.Arduino.ORDER_NONE);
  var colour = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE);
  
  // Convert hex color to RGB
  var rgbColor = hexToRgb(colour);
  
  Blockly.Arduino.includes_["TFT"] = "#include <U8g2lib.h>\n#include <Arduino_GFX_Library.h>";
  
  Blockly.Arduino.definitions_["TFT"] = "Arduino_DataBus *bus = new Arduino_HWSPI(25 /* DC */, 26 /* CS */);\nArduino_GFX *gfx = new Arduino_ST7789(bus, 27 /* RST */, 0 /* rotation */);";

  Blockly.Arduino.setups_['TFT'] = "gfx->begin();\n  gfx->invertDisplay(true);";
  
  return `gfx->drawPixel(${x}, ${y}, RGB565(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}));\n`;
}
//画线
Blockly.Arduino['scratchstar_DrawLine'] = function (block) {
  var sx = Blockly.Arduino.valueToCode(block, 'sx', Blockly.Arduino.ORDER_NONE);
  var sy = Blockly.Arduino.valueToCode(block, 'sy', Blockly.Arduino.ORDER_NONE);
  var ex = Blockly.Arduino.valueToCode(block, 'ex', Blockly.Arduino.ORDER_NONE);
  var ey = Blockly.Arduino.valueToCode(block, 'ey', Blockly.Arduino.ORDER_NONE);
  var colour = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE);
  
  // Convert hex color to RGB
  var rgbColor = hexToRgb(colour);
  
  Blockly.Arduino.includes_["TFT"] = "#include <U8g2lib.h>\n#include <Arduino_GFX_Library.h>";
  
  Blockly.Arduino.definitions_["TFT"] = "Arduino_DataBus *bus = new Arduino_HWSPI(25 /* DC */, 26 /* CS */);\nArduino_GFX *gfx = new Arduino_ST7789(bus, 27 /* RST */, 0 /* rotation */);";

  Blockly.Arduino.setups_['TFT'] = "gfx->begin();\n  gfx->invertDisplay(true);";
  
  return `gfx->drawLine(${sx}, ${sy}, ${ex}, ${ey}, RGB565(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}));\n`;
}
//画矩形
Blockly.Arduino['scratchstar_DrawRect'] = function (block) {
  var mode = block.getFieldValue('mode');
  var sx = Blockly.Arduino.valueToCode(block, 'sx', Blockly.Arduino.ORDER_NONE);
  var sy = Blockly.Arduino.valueToCode(block, 'sy', Blockly.Arduino.ORDER_NONE);
  var width = Blockly.Arduino.valueToCode(block, 'width', Blockly.Arduino.ORDER_NONE);
  var height = Blockly.Arduino.valueToCode(block, 'height', Blockly.Arduino.ORDER_NONE);
  var colour = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE);
  
  // Convert hex color to RGB
  var rgbColor = hexToRgb(colour);
  
  Blockly.Arduino.includes_["TFT"] = "#include <U8g2lib.h>\n#include <Arduino_GFX_Library.h>";
  
  Blockly.Arduino.definitions_["TFT"] = "Arduino_DataBus *bus = new Arduino_HWSPI(25 /* DC */, 26 /* CS */);\nArduino_GFX *gfx = new Arduino_ST7789(bus, 27 /* RST */, 0 /* rotation */);";

  Blockly.Arduino.setups_['TFT'] = "gfx->begin();\n  gfx->invertDisplay(true);";
  
  // Check if filled or outline
  if (mode === '1') { // Outline
      return `gfx->drawRect(${sx}, ${sy}, ${width}, ${height}, gfx->color565(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}));\n`;
  } else { // Filled
      return `gfx->fillRect(${sx}, ${sy}, ${width}, ${height}, gfx->color565(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}));\n`;
  }
}

Blockly.Arduino['scratchstar_DrawRoundRect'] = function (block) {
  var mode = block.getFieldValue('mode');
  var sx = Blockly.Arduino.valueToCode(block, 'sx', Blockly.Arduino.ORDER_NONE);
  var sy = Blockly.Arduino.valueToCode(block, 'sy', Blockly.Arduino.ORDER_NONE);
  var width = Blockly.Arduino.valueToCode(block, 'width', Blockly.Arduino.ORDER_NONE);
  var height = Blockly.Arduino.valueToCode(block, 'height', Blockly.Arduino.ORDER_NONE);
  var radius = Blockly.Arduino.valueToCode(block, 'radius', Blockly.Arduino.ORDER_NONE);
  var colour = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE);
  
  // Convert hex color to RGB
  var rgbColor = hexToRgb(colour);
  
  Blockly.Arduino.includes_["TFT"] = "#include <U8g2lib.h>\n#include <Arduino_GFX_Library.h>";
  
  Blockly.Arduino.definitions_["TFT"] = "Arduino_DataBus *bus = new Arduino_HWSPI(25 /* DC */, 26 /* CS */);\nArduino_GFX *gfx = new Arduino_ST7789(bus, 27 /* RST */, 0 /* rotation */);";

  Blockly.Arduino.setups_['TFT'] = "gfx->begin();\n  gfx->invertDisplay(true);";
  
  // Check if filled or outline
  if (mode === '1') { // Outline
      return `gfx->drawRoundRect(${sx}, ${sy}, ${width}, ${height}, ${radius}, gfx->color565(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}));\n`;
  } else { // Filled
      return `gfx->fillRoundRect(${sx}, ${sy}, ${width}, ${height}, ${radius}, gfx->color565(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}));\n`;
  }
}

Blockly.Arduino['scratchstar_DrawCircle'] = function (block) {
  var mode = block.getFieldValue('mode');
  var cx = Blockly.Arduino.valueToCode(block, 'cx', Blockly.Arduino.ORDER_NONE);
  var cy = Blockly.Arduino.valueToCode(block, 'cy', Blockly.Arduino.ORDER_NONE);
  var radius = Blockly.Arduino.valueToCode(block, 'radius', Blockly.Arduino.ORDER_NONE);
  var colour = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE);
  
  // Convert hex color to RGB
  var rgbColor = hexToRgb(colour);
  
  Blockly.Arduino.includes_["TFT"] = "#include <U8g2lib.h>\n#include <Arduino_GFX_Library.h>";
  
  Blockly.Arduino.definitions_["TFT"] = "Arduino_DataBus *bus = new Arduino_HWSPI(25 /* DC */, 26 /* CS */);\nArduino_GFX *gfx = new Arduino_ST7789(bus, 27 /* RST */, 0 /* rotation */);";

  Blockly.Arduino.setups_['TFT'] = "gfx->begin();\n  gfx->invertDisplay(true);";
  
  // Check if filled or outline
  if (mode === '1') { // Outline
      return `gfx->drawCircle(${cx}, ${cy}, ${radius}, gfx->color565(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}));\n`;
  } else { // Filled
      return `gfx->fillCircle(${cx}, ${cy}, ${radius}, gfx->color565(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}));\n`;
  }
}
//画椭圆
Blockly.Arduino['scratchstar_DrawEllipse'] = function (block) {
  var mode = block.getFieldValue('mode');
  var cx = Blockly.Arduino.valueToCode(block, 'cx', Blockly.Arduino.ORDER_NONE);
  var cy = Blockly.Arduino.valueToCode(block, 'cy', Blockly.Arduino.ORDER_NONE);
  var longaxis = Blockly.Arduino.valueToCode(block, 'longaxis', Blockly.Arduino.ORDER_NONE);
  var shortaxis = Blockly.Arduino.valueToCode(block, 'shortaxis', Blockly.Arduino.ORDER_NONE);
  var colour = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE);
  
  // Convert hex color to RGB
  var rgbColor = hexToRgb(colour);
  
  Blockly.Arduino.includes_["TFT"] = "#include <U8g2lib.h>\n#include <Arduino_GFX_Library.h>";
  
  Blockly.Arduino.definitions_["TFT"] = "Arduino_DataBus *bus = new Arduino_HWSPI(25 /* DC */, 26 /* CS */);\nArduino_GFX *gfx = new Arduino_ST7789(bus, 27 /* RST */, 0 /* rotation */);";

  Blockly.Arduino.setups_['TFT'] = "gfx->begin();\n  gfx->invertDisplay(true);";
  
  // Check if filled or outline
  if (mode === '1') { // Outline
      return `gfx->drawEllipse(${cx}, ${cy}, ${longaxis}, ${shortaxis}, gfx->color565(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}));\n`;
  } else { // Filled
      return `gfx->fillEllipse(${cx}, ${cy}, ${longaxis}, ${shortaxis}, gfx->color565(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}));\n`;
  }
}

Blockly.Arduino['scratchstar_DrawTriangle'] = function (block) {
  var mode = block.getFieldValue('mode');
  var ax = Blockly.Arduino.valueToCode(block, 'ax', Blockly.Arduino.ORDER_NONE);
  var ay = Blockly.Arduino.valueToCode(block, 'ay', Blockly.Arduino.ORDER_NONE);
  var bx = Blockly.Arduino.valueToCode(block, 'bx', Blockly.Arduino.ORDER_NONE);
  var by = Blockly.Arduino.valueToCode(block, 'by', Blockly.Arduino.ORDER_NONE);
  var cx = Blockly.Arduino.valueToCode(block, 'cx', Blockly.Arduino.ORDER_NONE);
  var cy = Blockly.Arduino.valueToCode(block, 'cy', Blockly.Arduino.ORDER_NONE);
  var colour = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE);
  
  // Convert hex color to RGB
  var rgbColor = hexToRgb(colour);
  
  Blockly.Arduino.includes_["TFT"] = "#include <U8g2lib.h>\n#include <Arduino_GFX_Library.h>";
  
  Blockly.Arduino.definitions_["TFT"] = "Arduino_DataBus *bus = new Arduino_HWSPI(25 /* DC */, 26 /* CS */);\nArduino_GFX *gfx = new Arduino_ST7789(bus, 27 /* RST */, 0 /* rotation */);";

  Blockly.Arduino.setups_['TFT'] = "gfx->begin();\n  gfx->invertDisplay(true);";
  
  // Check if filled or outline
  if (mode === '1') { // Outline
      return `gfx->drawTriangle(${ax}, ${ay}, ${bx}, ${by}, ${cx}, ${cy}, gfx->color565(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}));\n`;
  } else { // Filled
      return `gfx->fillTriangle(${ax}, ${ay}, ${bx}, ${by}, ${cx}, ${cy}, gfx->color565(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}));\n`;
  }
}

//传感器
//主控器上按键
Blockly.Arduino['scratchstar_TouchBoardKey'] = function (block) {
  var position = block.getFieldValue('position');
  var pin = port2pin(7, position);
  Blockly.Arduino.setups_['TouchBoardKey' + pin] = `pinMode(${pin}, INPUT);`;
  var code = `digitalRead(${pin}) == 0`;
  return [code, Blockly.Arduino.ORDER_HIGH];
}
//触碰开关
Blockly.Arduino['scratchstar_TouchSwitch'] = function (block) {
  var port = block.getFieldValue('port');
  var pin = port2pin(port, 1);
  Blockly.Arduino.setups_['TouchSwitch' + pin] = `pinMode(${pin}, INPUT);`;
  var code = `digitalRead(${pin}) == 0`;
  return [code, Blockly.Arduino.ORDER_HIGH];
}

//4按键
Blockly.Arduino['scratchstar_KeysPressed'] = function (block) {
  var port = block.getFieldValue('port');
  var number = block.getFieldValue('number');
  var pin = port2pin(port, number);
  Blockly.Arduino.setups_['KeysPressed' + pin] = `pinMode(${pin}, INPUT);`;
  var code = `digitalRead(${pin}) == 0`;
  return [code, Blockly.Arduino.ORDER_HIGH];
}
//超声波
Blockly.Arduino['scratchstar_GetUltrasonic'] = function (block) {
  var port = block.getFieldValue('port');
  var echoPin = port2pin(port, 1);
  var trigPin = port2pin(port, 2);
  Blockly.Arduino.setups_['GetUltrasonic' + echoPin] = `pinMode(${echoPin}, INPUT);`;
  Blockly.Arduino.setups_['GetUltrasonic' + trigPin] = `pinMode(${trigPin}, OUTPUT);`;
  Blockly.Arduino.customFunctions_['getDistanceCM'] = `
  int getDistanceCM(int trigPin,int echoPin) {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10); 
  digitalWrite(trigPin, LOW);
  int  distance = pulseIn(echoPin, HIGH) / 58; //cm
  return distance;
  }`;
  var code = `getDistanceCM(${trigPin}, ${echoPin})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
}

//红外避障
Blockly.Arduino['scratchstar_IRAvoidance'] = function (block) {
  var port = block.getFieldValue('port');
  var pin = port2pin(port, 3);
  Blockly.Arduino.setups_['IRAvoidance' + pin] = `pinMode(${pin}, INPUT);`;
  var code = `analogRead(${pin})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
}

Blockly.Arduino['scratchstar_isAvoidanceDetected'] = function (block) {
  var port = block.getFieldValue('port');
  var threshold = Blockly.Arduino.valueToCode(block, 'threshold', Blockly.Arduino.ORDER_NONE);
  var pin = port2pin(port, 3);
  Blockly.Arduino.setups_['isAvoidanceDetected' + pin] = `pinMode(${pin}, INPUT);`;
  var code = `analogRead(${pin}) < ${threshold}`;
  return [code, Blockly.Arduino.ORDER_HIGH];
}


//光敏
Blockly.Arduino['scratchstar_GetLigthValue'] = function (block) {
  var port = block.getFieldValue('port');
  var pin = port2pin(port, 3);
  Blockly.Arduino.setups_['GetLigthValue' + pin] = `pinMode(${pin}, INPUT);`;
  var code = `analogRead(${pin})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
}

//温度
Blockly.Arduino['scratchstar_GetTemperature'] = function (block) {
  var port = block.getFieldValue('port');
  var pin = port2pin(port, 1);
  Blockly.Arduino.includes_["DHT"] = "#include <DHT.h>";
  Blockly.Arduino.definitions_["DHT"+port] = `DHT dht${port}(${pin}, DHT22);`;
  Blockly.Arduino.setups_['DHT' + port] = `dht${port}.begin();`;
  var code = `dht${port}.readTemperature()`;
  return [code, Blockly.Arduino.ORDER_HIGH];
}


//湿度
Blockly.Arduino['scratchstar_GetHumidity'] = function (block) {
  var port = block.getFieldValue('port');
  var pin = port2pin(port, 1);
  Blockly.Arduino.includes_["DHT"] = "#include <DHT.h>";
  Blockly.Arduino.definitions_["DHT"+port] = `DHT dht${port}(${pin}, DHT22);`;
  Blockly.Arduino.setups_['DHT' + port] = `dht${port}.begin();`;
  var code = `dht${port}.readHumidity()`;
  return [code, Blockly.Arduino.ORDER_HIGH];
}



//电位器
Blockly.Arduino['scratchstar_GetSlideValue'] = function (block) {
  var port = block.getFieldValue('port');
  var pin = port2pin(port, 3);
  Blockly.Arduino.setups_['GetSlideValue' + pin] = `pinMode(${pin}, INPUT);`;
  var code = `analogRead(${pin})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
}

//声音
Blockly.Arduino['scratchstar_GetSoundValue'] = function (block) {
  var port = block.getFieldValue('port');
  var pin = port2pin(port, 3);
  Blockly.Arduino.setups_['GetSoundValue' + pin] = `pinMode(${pin}, INPUT);`;
  var code = `analogRead(${pin})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
}

//灰度  
Blockly.Arduino['scratchstar_GrayScale'] = function (block) {
  var port = block.getFieldValue('port');
  var pos = block.getFieldValue('secondary');
  var pin = port2pin(port, 3 + (pos - 1));
  Blockly.Arduino.setups_['GrayScale' + pin] = `pinMode(${pin}, INPUT);`;
  var code = `analogRead(${pin})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
}

//摇杆
Blockly.Arduino['scratchstar_GetJoystickXValue'] = function (block) {
  var port = block.getFieldValue('port');
  var pin = port2pin(port, 4);
  Blockly.Arduino.setups_['GetJoystickXValue' + pin] = `pinMode(${pin}, INPUT);`;
  var code = `analogRead(${pin})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
}

Blockly.Arduino['scratchstar_GetJoystickYValue'] = function (block) {
  var port = block.getFieldValue('port');
  var pin = port2pin(port, 3);
  Blockly.Arduino.setups_['GetJoystickYValue' + pin] = `pinMode(${pin}, INPUT);`;
  var code = `analogRead(${pin})`;
  return [code, Blockly.Arduino.ORDER_HIGH];
}

Blockly.Arduino['scratchstar_JoystickPressed'] = function (block) {
  var port = block.getFieldValue('port');
  var pin = port2pin(port, 1);
  Blockly.Arduino.setups_['GetJoystickButton' + pin] = `pinMode(${pin}, INPUT);`;
  var code = `digitalRead(${pin}) == 0`;
  return [code, Blockly.Arduino.ORDER_HIGH];
}

//舵机角度
Blockly.Arduino['scratchstar_ServoCurrentAngle'] = function (block) {
  var port = block.getFieldValue('port');
  var sclPin = port2pin(port, 1);
  var sdaPin = port2pin(port, 2);
  Blockly.Arduino.includes_["SoftwareWire"] = '#include <SoftwareWire.h>';
  Blockly.Arduino.definitions_["Servo"+port] = `SoftwareWire myWire${port}(${sclPin}, ${sdaPin});`;
  Blockly.Arduino.setups_['Servo' + port] = `myWire${port}.begin();\nmyWire${port}.setClock(80L * 1000L);`;

  Blockly.Arduino.customFunctions_['readServoAngle' + port] = `
  union {
      long longVal;
      byte byteVal[4];
  } val;
  float readServoAngle${port}() {
      myWire${port}.beginTransmission(0x7F);
      myWire${port}.write(0xB0);
      myWire${port}.requestFrom(0x7F, 10);
      byte buffer[10];
      myWire${port}.readBytes(buffer, 10);
      myWire${port}.endTransmission();
      
      val.byteVal[0] = buffer[4];
      val.byteVal[1] = buffer[3];
      val.byteVal[2] = buffer[2];
      val.byteVal[3] = buffer[1];
      return val.longVal * 0.6;
  }`;
 
  var code = `readServoAngle${port}()`;
  return [code, Blockly.Arduino.ORDER_HIGH];
}

Blockly.Arduino['scratchstar_GetReceivedCode'] = function (block) {
  var port = block.getFieldValue('port');
  var pin = port2pin(port, 1);
  Blockly.Arduino.includes_["IRremote"] = '#include <IRremote.h>';
  Blockly.Arduino.definitions_["IRremote"+port] = `IRrecv irrecv${port}(${pin});`;
  Blockly.Arduino.setups_['IRremote' + port] = `irrecv${port}.enableIRIn();`;
  Blockly.Arduino.customFunctions_['getReceivedCode' + port] = `
  uint32_t getReceivedCode${port}() {
      if (irrecv${port}.decode()) {
          uint32_t value = irrecv${port}.decodedIRData.decodedRawData;
          irrecv${port}.resume();
          return value;
      }
      return 0;
  }`;
  var code = `getReceivedCode${port}()`;
  return [code, Blockly.Arduino.ORDER_HIGH];
}




Blockly.Arduino['scratchstar_setRGBLed'] = function (block) {
  const port = block.getFieldValue('port');
  const index = block.getFieldValue('index');
  var red = Blockly.Arduino.valueToCode(block, 'red', Blockly.Arduino.ORDER_NONE);
  var green = Blockly.Arduino.valueToCode(block, 'green', Blockly.Arduino.ORDER_NONE);
  var blue = Blockly.Arduino.valueToCode(block, 'blue', Blockly.Arduino.ORDER_NONE);
  const pin = port2pin(port, 1) //这里的1是表示每个TYPE-C有多个引脚，这里的表示每个TYPEC引脚中的第一个引脚
  Blockly.Arduino.includes_["RGB"] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_[`RGB${port}`] = `Adafruit_NeoPixel pixels${port}(3, ${pin}, NEO_GRB + NEO_KHZ800);`
  Blockly.Arduino.setups_[`RGB${port}`] = `pixels${port}.begin();`;

  if (index == 0) {
      return`pixels${port}.setPixelColor(0, pixels${port}.Color(${red}, ${green}, ${blue}));\npixels${port}.setPixelColor(1, pixels${port}.Color(${red}, ${green}, ${blue}));\npixels${port}.setPixelColor(2, pixels${port}.Color(${red}, ${green}, ${blue}));\npixels${port}.show();\n`;
  }
  return `pixels${port}.setPixelColor(${index-1}, pixels${port}.Color(${red}, ${green}, ${blue}));\npixels${port}.show();\n`;
}

Blockly.Arduino['scratchstar_BuzzerAlarm'] = function (block) {
  const port = block.getFieldValue('port')
  const pin = port2pin(port, 1) //这里的1是表示每个TYPE-C有多个引脚，这里的表示每个TYPEC引脚中的第一个引脚
  Blockly.Arduino.setups_[`OUTPUT${pin}`] = `pinMode(${pin}, OUTPUT);`;
  return `tone(${pin}, 888);\n`;
}

Blockly.Arduino['scratchstar_BuzzerStop'] = function (block) {
  const port = block.getFieldValue('port')
  const pin = port2pin(port, 1) //这里的1是表示每个TYPE-C有多个引脚，这里的表示每个TYPEC引脚中的第一个引脚
  Blockly.Arduino.setups_[`OUTPUT${pin}`] = `pinMode(${pin}, OUTPUT);`;
  return `noTone(${pin});\n`;
}

Blockly.Arduino['scratchstar_BuzzerRing'] = function (block) {
  const port = block.getFieldValue('port')
  var value = Blockly.Arduino.valueToCode(block, 'value', Blockly.Arduino.ORDER_NONE);
  const pin = port2pin(port, 1) //这里的1是表示每个TYPE-C有多个引脚，这里的表示每个TYPEC引脚中的第一个引脚
  Blockly.Arduino.setups_[`OUTPUT${pin}`] = `pinMode(${pin}, OUTPUT);`;
  return `tone(${pin}, ${value});\n`;
}

Blockly.Arduino['scratchstar_BuzzerPlayNote'] = function (block) {
  const port = block.getFieldValue('port');
  const highvalue= block.getFieldValue('highvalue');
  const note= block.getFieldValue('note');
  const beat= block.getFieldValue('beat');
  const pin = port2pin(port, 1) //这里的1是表示每个TYPE-C有多个引脚，这里的表示每个TYPEC引脚中的第一个引脚
  var buzzerNotes = { 1: 261.5, 2: 293.5, 3: 329.5, 4: 349, 5: 392, 6: 440, 7: 494, 0: 0 }
  var i = Math.pow(2, highvalue - 1)
  const tone = (buzzerNotes[note] * i / 2).toFixed(0);
  Blockly.Arduino.setups_[`OUTPUT${pin}`] = `pinMode(${pin}, OUTPUT);`;
  return `tone(${pin}, ${tone});delay(${beat});\nnoTone(${pin});\n`;
}

Blockly.Arduino['scratchstar_IRSendCode'] = function (block) {
  const port = block.getFieldValue('port')
  var code =  Blockly.Arduino.valueToCode(block, 'code', Blockly.Arduino.ORDER_NONE);
  const pin = port2pin(port, 1)
  Blockly.Arduino.includes_["IRremote"] = '#include <IRremote.h>';
  Blockly.Arduino.definitions_["IRSend"+port] = `IRsend irsend${port}(${pin});`;
  return `irsend${port}.sendRC5(${code}, 32);\n`;
}

Blockly.Arduino['scratchstar_MotorForward'] = function (block) {
  const port = block.getFieldValue('port')
  var speed =  Blockly.Arduino.valueToCode(block, 'speed', Blockly.Arduino.ORDER_NONE);
  const pin1 = port2pin(port, 1)
  const pin2 = port2pin(port, 2)
  Blockly.Arduino.setups_[`OUTPUT${pin1}`] = `pinMode(${pin1}, OUTPUT);`;
  Blockly.Arduino.setups_[`OUTPUT${pin2}`] = `pinMode(${pin2}, OUTPUT);`;
  return `analogWrite(${pin1}, ${speed});\nanalogWrite(${pin2}, 0);\n`;
}

Blockly.Arduino['scratchstar_MotorBackward'] = function (block) {
  const port = block.getFieldValue('port')
  var speed =  Blockly.Arduino.valueToCode(block, 'speed', Blockly.Arduino.ORDER_NONE);
  const pin1 = port2pin(port, 1)
  const pin2 = port2pin(port, 2)
  Blockly.Arduino.setups_[`OUTPUT${pin1}`] = `pinMode(${pin1}, OUTPUT);`;
  Blockly.Arduino.setups_[`OUTPUT${pin2}`] = `pinMode(${pin2}, OUTPUT);`;
  return `analogWrite(${pin1}, 0);\nanalogWrite(${pin2}, ${speed});\n`;
}

Blockly.Arduino['scratchstar_MotorStop'] = function (block) {
  const port = block.getFieldValue('port')
  const pin1 = port2pin(port, 1)
  const pin2 = port2pin(port, 2)
  Blockly.Arduino.setups_[`OUTPUT${pin1}`] = `pinMode(${pin1}, OUTPUT);`;
  Blockly.Arduino.setups_[`OUTPUT${pin2}`] = `pinMode(${pin2}, OUTPUT);`;
  return `analogWrite(${pin1}, 0);\nanalogWrite(${pin2}, 0);\n`;
}

Blockly.Arduino['scratchstar_ServoOutCircle'] = function (block) {
  const port = block.getFieldValue('port')
  const circle =  Blockly.Arduino.valueToCode(block, 'circle', Blockly.Arduino.ORDER_NONE);
  const speed =  Blockly.Arduino.valueToCode(block, 'speed', Blockly.Arduino.ORDER_NONE);
  const direction= circle<0?'0x02':'0x01'
  const pin1 = port2pin(port, 1)
  const pin2 = port2pin(port, 2)
  const sppedHex='0x' + speed.toString(16)
  const circle1Hex= '0x'+(circle & 0xFF).toString(16)
  const circle2Hex= '0x'+(circle >> 8 & 0xFF).toString(16)

  
  Blockly.Arduino.includes_["SoftwareWire"] = '#include <SoftwareWire.h>';
  Blockly.Arduino.definitions_[`ServoDefin${port}`] = `SoftwareWire myWire${port}(${pin2}, ${pin1});`;
  Blockly.Arduino.setups_[`ServoSetup${port}`] = `myWire${port}.begin();\n${Blockly.Arduino.INDENT}myWire${port}.setClock(80L * 1000L);\n`;
  var code=`myWire${port}.beginTransmission(0x7F);\n`
  code+=`byte cmdCircle${port}[9]={0xA0, 0x01, ${direction}, 0x01, ${sppedHex}, ${circle2Hex}, ${circle1Hex}, 0x00, 0x00};\n`
  code+=`myWire${port}.write(cmdCircle${port}, 9);\n`
  code+=`myWire${port}.endTransmission();\n`
  return code;
}


Blockly.Arduino['scratchstar_ServoOutput'] = function (block) {
  const port = block.getFieldValue('port')
  const angle =  Blockly.Arduino.valueToCode(block, 'angle', Blockly.Arduino.ORDER_NONE);
  const speed =  Blockly.Arduino.valueToCode(block, 'speed', Blockly.Arduino.ORDER_NONE);
  const direction= angle<0?'0x02':'0x01'
  const pin1 = port2pin(port, 1)
  const pin2 = port2pin(port, 2)
  const sppedHex='0x' + speed.toString(16)
  const angle1Hex= '0x'+(angle & 0xFF).toString(16)
  const angle2Hex= '0x'+(angle >> 8 & 0xFF).toString(16)
  
  Blockly.Arduino.includes_["SoftwareWire"] = '#include <SoftwareWire.h>';
  Blockly.Arduino.definitions_[`ServoDefin${port}`] = `SoftwareWire myWire${port}(${pin2}, ${pin1});`;
  Blockly.Arduino.setups_[`ServoSetup${port}`] = `myWire${port}.begin();\n${Blockly.Arduino.INDENT}myWire${port}.setClock(80L * 1000L);\n`;
  var code=`myWire${port}.beginTransmission(0x7F);\n`
  code+=`byte cmdAngle${port}[9]={0xA0, 0x02, ${direction}, 0x01, ${sppedHex}, 0x00, 0x00, ${angle2Hex}, ${angle1Hex}};\n`
  code+=`myWire${port}.write(cmdAngle${port}, 9);\n`
  code+=`myWire${port}.endTransmission();\n`
  return code;
}











    return Blockly;
}

exports = registerGenerators;
