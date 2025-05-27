#include "OnlyStemBoard.h"

#define ADD 0x00

MPU6050 accelgyro; //陀螺仪


// Init array that will store new card value
union {
	byte blockValue[2];
	unsigned short shotValue;

} cardValue;


void OnlyStemBoard::tone(uint16_t frequency, uint32_t duration)
{
	cli();
	unsigned int period = 1000000L / frequency;
	unsigned int pulse = period / 2;
	for (unsigned long i = 0; i < duration * 1000L; i += period) {
		digitalWrite(BUZZER, HIGH);
		delayMicroseconds(pulse);
		digitalWrite(BUZZER, LOW);
		delayMicroseconds(pulse);
	}
	sei();
}




OnlyStemBoard::OnlyStemBoard(){
	pinMode(13,OUTPUT);
  level = 0;
}

void OnlyStemBoard::blink(){
	level = 1- level;
	digitalWrite(13,level);
}

//电位器
int OnlyStemBoard::readAnalog(byte ports ) {
	switch (ports) {
		case 1:
		return analogRead(A1);
		case 2:
		return analogRead(A2);
		case 3:
		return analogRead(A3);
		case 4:
		return analogRead(A5);
		case 5:
		return analogRead(A4);
	}
}


bool OnlyStemBoard::readDigital(byte ports ) {
	switch (ports) {
		case 1:
		return digitalRead(A1);
		case 2:
		return digitalRead(A2);
		case 3:
		return digitalRead(A3);
		case 4:
		return digitalRead(A5);
		case 5:
		return digitalRead(A4);
	}
}

//电机风扇
void OnlyStemBoard::runMotor(byte ports,int value) {
	if (value >255) value = 255;
	switch (ports) {
		case 1:
		return analogWrite(11,value);
		case 2:
		return analogWrite(9,value);
		case 3:
		return analogWrite(10,value);
		case 4:
		return analogWrite(13,value);
		case 5:
		return analogWrite(5,value);
	}
}

//get PWM Pin
byte OnlyStemBoard::getPWMPin(byte ports) {
	switch (ports) {
		case 1:
		return 11;
		case 2:
		return 9;
		case 3:
		return 10;
		case 4:
		return 13;
		case 5:
		return 5;
	}
}

//get analog Pin
byte OnlyStemBoard::getAnalogPin(byte ports) {
	switch (ports) {
		case 1:
		return A1;
		case 2:
		return A2;
		case 3:
		return A3;
		case 4:
		return A5;
		case 5:
		return A4;
	}
}

//精确测距会影响红外接收
long OnlyStemBoard::getDistanceCM(byte ports) {
	digitalWrite(getPWMPin(ports), LOW);
	delayMicroseconds(2);
	digitalWrite(getPWMPin(ports), HIGH);
	delayMicroseconds(10); //至少10us的高电平，实际40-50us效果好
	cli();
	//禁止中断
	digitalWrite(getPWMPin(ports), LOW);
	long distance = pulseIn(getAnalogPin(ports), HIGH, 23000) / 58; //cm
	sei();
	// 打开中断
	return distance;
}

//模拟键盘

//////////////////////////
// 模拟键盘初始化
// 输入：端口号
// 输出：
//////////////////////////
void OnlyStemBoard::initializeKey(byte pin) {
  pinMode(pin, INPUT);
  digitalWrite(pin, LOW);

  for (int j = 0; j < 3; j++) {
    inputKey[pin - 19].measurementBuffer[j] = 0;
  }
  inputKey[pin - 19].oldestMeasurement = 0;
  inputKey[pin - 19].bufferSum = 0;
  inputKey[pin - 19].isKeyDown = false;

}

//////////////////////////
// 模拟键盘读取布尔值
// 输入：端口（19-23）
// 输出：bool
//////////////////////////
bool OnlyStemBoard::checkPressKey(byte pin) {
  byte currentByte = inputKey[pin - 19].measurementBuffer[byteCounter];
  inputKey[pin - 19].oldestMeasurement = (currentByte >> bitCounter) & 0x01;

  // 读取新按键值
  boolean newMeasurement = digitalRead(pin);

  // 翻转端口读取值
  newMeasurement = !newMeasurement;

  // 存储当前按键值
  if (newMeasurement) {
    currentByte |= (1 << bitCounter);
    inputKey[pin - 19].bufferSum++;
  }
  else {
    currentByte &= ~(1 << bitCounter);
  }
  inputKey[pin - 19].measurementBuffer[byteCounter] = currentByte;
  if (inputKey[pin - 19].oldestMeasurement) {
    inputKey[pin - 19].bufferSum--;
  }

  if (inputKey[pin - 19].isKeyDown)
  {
    if (inputKey[pin - 19].bufferSum < 12) {
      inputKey[pin - 19].isKeyDown = false;
    }
  }
  else
  {
    if (inputKey[pin - 19].bufferSum > 14) { // 视为按键按下
      inputKey[pin - 19].isKeyDown = true;
    }
  }
  return inputKey[pin - 19].isKeyDown;
}

//////////////////////////
// 模拟键盘读取键盘值
// 输入：端口（19-23），键盘值
// 输出：
//////////////////////////
void OnlyStemBoard::pressKeyboard(byte pin, int key) {
	if (checkPressKey(pin)) {
		Keyboard.press(key);
	}
	 else {
		Keyboard.release(key);   
	}                           
}
//////////////////////////
// 模拟键盘按键延时
// 输入：端口（19-23），键盘值
// 输出：
//////////////////////////
void OnlyStemBoard::delayForKey()
{
  bitCounter++;
  if (bitCounter == 8) {
    bitCounter = 0;
    byteCounter++;
    if (byteCounter == 3) {
      byteCounter = 0;
    }
  }
  int loopTime = micros() - prevTime;
  if (loopTime < TARGET_LOOP_TIME) {
    int wait = TARGET_LOOP_TIME - loopTime;
    delayMicroseconds(wait);
  }
  prevTime = micros();
}

long OnlyStemBoard::bluetoothRead() {
	if (Serial1.available() > 0) {
		btDelayTime = millis();
		long value = Serial1.parseInt();
		if (value !=0) {
			btPreValue = value;
		} 
		return btPreValue;                                                              
	} else {
		// if (millis() - btDelayTime > 1000) {
		// 	btDelayTime = millis();
		// 	btPreValue = 0;
		// }
		return btPreValue;
	}
	//while(Serial1.read() >= 0){}  
}


// void OnlyStemBoard::initOLED() {
// 	u8g2.setI2CAddress(0x3c * 2);
// 	u8g2.begin();
// }
// void OnlyStemBoard::displayText(int displayX,int displayY, String text) {	

// 	u8g2.clearBuffer();
// 	u8g2.setFont(u8g2_font_logisoso16_tf);
// 	u8g2.drawStr(displayX, displayY + 16, text.c_str());
// 	u8g2.sendBuffer();
// }


void OnlyStemBoard::inityro() {
	accelgyro.initialize();                 //初始化
	int times = 200;             //采样次数
	for (int i = 0; i < times; i++) {
		accelgyro.getMotion6(&ax, &ay, &az, &gx, &gy, &gz); //读取六轴原始数值
		axo += ax;
		ayo += ay;
		azo += az;      //采样和
		gxo += gx;
		gyo += gy;
		gzo += gz;
	}
	axo /= times;
	ayo /= times;
	azo /= times; //计算加速度计偏移
	gxo /= times;
	gyo /= times;
	gzo /= times; //计算陀螺仪偏移

}
void OnlyStemBoard::gyroMeasure() {

	unsigned long now = millis();             //当前时间(ms)
	if (now - _lastGyroTime > 20) {
		gyroDt = (now - _lastGyroTime) / 1000.0;           //微分时间(s)
		_lastGyroTime = now;                           //上一次采样时间(ms)

		accelgyro.getMotion6(&ax, &ay, &az, &gx, &gy, &gz); //读取六轴原始数值

		float accx = ax / AcceRatio;              //x轴加速度
		float accy = ay / AcceRatio;              //y轴加速度
		float accz = az / AcceRatio;              //z轴加速度

		aax = atan(accy / accz) * (-180) / pi;    //y轴对于z轴的夹角
		aay = atan(accx / accz) * 180 / pi;       //x轴对于z轴的夹角
		aaz = atan(accz / accy) * 180 / pi;       //z轴对于y轴的夹角

		aax_sum = 0;                              // 对于加速度计原始数据的滑动加权滤波算法
		aay_sum = 0;
		aaz_sum = 0;

		for (int i = 1; i < n_sample; i++) {
			aaxs[i - 1] = aaxs[i];
			aax_sum += aaxs[i] * i;
			aays[i - 1] = aays[i];
			aay_sum += aays[i] * i;
			aazs[i - 1] = aazs[i];
			aaz_sum += aazs[i] * i;

		}

		aaxs[n_sample - 1] = aax;
		aax_sum += aax * n_sample;
		aax = (aax_sum / (11 * n_sample / 2.0)) * 9 / 7.0; //角度调幅至0-90°
		aays[n_sample - 1] = aay;                        //此处应用实验法取得合适的系数
		aay_sum += aay * n_sample;                     //本例系数为9/7
		aay = (aay_sum / (11 * n_sample / 2.0)) * 9 / 7.0;
		aazs[n_sample - 1] = aaz;
		aaz_sum += aaz * n_sample;
		aaz = (aaz_sum / (11 * n_sample / 2.0)) * 9 / 7.0;

		float gyrox = -(gx - gxo) / GyroRatio * gyroDt; //x轴角速度
		float gyroy = -(gy - gyo) / GyroRatio * gyroDt; //y轴角速度
		float gyroz = -(gz - gzo) / GyroRatio * gyroDt; //z轴角速度
		agx += gyrox;                             //x轴角速度积分
		agy += gyroy;                             //x轴角速度积分
		agz += gyroz;

		/* kalman start */
		Sx = 0;
		Rx = 0;
		Sy = 0;
		Ry = 0;
		Sz = 0;
		Rz = 0;

		for (int i = 1; i < 10; i++) {                 //测量值平均值运算
			a_x[i - 1] = a_x[i];                      //即加速度平均值
			Sx += a_x[i];
			a_y[i - 1] = a_y[i];
			Sy += a_y[i];
			a_z[i - 1] = a_z[i];
			Sz += a_z[i];

		}

		a_x[9] = aax;
		Sx += aax;
		Sx /= 10;                                 //x轴加速度平均值
		a_y[9] = aay;
		Sy += aay;
		Sy /= 10;                                 //y轴加速度平均值
		a_z[9] = aaz;
		Sz += aaz;
		Sz /= 10;

		for (int i = 0; i < 10; i++) {
			Rx += sq(a_x[i] - Sx);
			Ry += sq(a_y[i] - Sy);
			Rz += sq(a_z[i] - Sz);

		}

		Rx = Rx / 9;                              //得到方差
		Ry = Ry / 9;
		Rz = Rz / 9;

		Px = Px + 0.0025;                         // 0.0025在下面有说明...
		Kx = Px / (Px + Rx);                      //计算卡尔曼增益
		agx = agx + Kx * (aax - agx);             //陀螺仪角度与加速度计速度叠加
		Px = (1 - Kx) * Px;                       //更新p值

		Py = Py + 0.0025;
		Ky = Py / (Py + Ry);
		agy = agy + Ky * (aay - agy);
		Py = (1 - Ky) * Py;

		Pz = Pz + 0.0025;
		Kz = Pz / (Pz + Rz);
		agz = agz + Kz * (aaz - agz);
		Pz = (1 - Kz) * Pz;
	}
	/* kalman end */

}

float OnlyStemBoard::getAngle (int xyz) {
	if (xyz == 1) {
		return agx;
	}
		if (xyz == 2) {
		return agy;
	}
		if (xyz == 3) {
		return agz;
	}

}