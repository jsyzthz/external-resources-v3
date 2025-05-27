#define Circle 1
#include "CircleBitV2.h"

#define ADD 0x00

 




// Init array that will store new card value
union {
	byte blockValue[2];
	unsigned short shotValue;

} cardValue;


void CircleBitV2::tone(uint16_t frequency, uint32_t duration)
{
	//cli();
	unsigned int period = 1000000L / frequency;
	unsigned int pulse = period / 2;
	for (unsigned long i = 0; i < duration * 1000L; i += period) {
		digitalWrite(BUZZER, HIGH);
		delayMicroseconds(pulse);
		digitalWrite(BUZZER, LOW);
		delayMicroseconds(pulse);
	}
	//sei();
}

CircleBitV2::CircleBitV2(){
	pinMode(13,OUTPUT);
  level = 0;
}

void CircleBitV2::blink(){
	level = 1- level;
	digitalWrite(13,level);
}

//电位器
int CircleBitV2::readAnalog(byte ports ) {
	switch (ports) {
		case 1:
		return analogRead(A3);
		case 2:
		return analogRead(A2);
		case 3:
		return analogRead(A1);
		case 4:
		return analogRead(A5);
		case 5:
		return analogRead(A4);
	}
}


bool CircleBitV2::readDigital(byte ports ) {
	switch (ports) {
		case 1:
		return digitalRead(A3);
		case 2:
		return digitalRead(A2);
		case 3:
		return digitalRead(A1);
		case 4:
		return digitalRead(A5);
		case 5:
		return digitalRead(A4);
	}
}

//电机风扇
void CircleBitV2::runMotor(byte ports,int value) {
	if (value >255) value = 255;
	switch (ports) {
		case 1:
		return analogWrite(10,value);
		case 2:
		return analogWrite(9,value);
		case 3:
		return analogWrite(6,value);
		case 4:
		return analogWrite(13,value);
		case 5:
		return analogWrite(5,value);
	}
}

//get PWM Pin
byte CircleBitV2::getPWMPin(byte ports) {
	switch (ports) {
		case 1:
		return 10;
		case 2:
		return 9;
		case 3:
		return 6;
		case 4:
		return 13;
		case 5:
		return 5;
	}
}

//get analog Pin
byte CircleBitV2::getAnalogPin(byte ports) {
	switch (ports) {
		case 1:
		return A3;
		case 2:
		return A2;
		case 3:
		return A1;
		case 4:
		return A5;
		case 5:
		return A4;
	}
}

//精确测距会影响红外接收
long CircleBitV2::getDistanceCM(byte ports) {
	digitalWrite(getPWMPin(ports), LOW);
	delayMicroseconds(2);
	digitalWrite(getPWMPin(ports), HIGH);
	delayMicroseconds(10); //至少10us的高电平，实际40-50us效果好
	cli();
	//禁止中断
	digitalWrite(getPWMPin(ports), LOW);
	long distance = pulseIn(getAnalogPin(ports), HIGH, 23000) / 58; //cm
	sei();
	if(!distance)distance=397;
	// 打开中断
	return distance;
}

//模拟键盘

//////////////////////////
// 模拟键盘初始化
// 输入：端口号
// 输出：
//////////////////////////
/*LHB注释
void CircleBitV2::initializeKey(byte pin) {
  pinMode(pin, INPUT);
  digitalWrite(pin, LOW);
   byte idx=0;
 if(pin==15){
	  idx=0;
  }else if(pin==16){
	  idx=1;
  }else if(pin==17){
	  idx=2;
  }else if(pin==8){
	  idx=3;
  }else if(pin==4){
	  idx=4;
  }
  for (int j = 0; j < 3; j++) {
    inputKey[idx].measurementBuffer[j] = 0;
  }
  inputKey[idx].oldestMeasurement = 0;
  inputKey[idx].bufferSum = 0;
  inputKey[idx].isKeyDown = false;

}
*/

void CircleBitV2::initializeKey(byte pin) {
  pinMode(pin, INPUT);
}
//////////////////////////
// 模拟键盘读取布尔值
// 输入：端口（19-23）
// 输出：bool
//////////////////////////
/* LHB 注释
bool CircleBitV2::checkPressKey(byte pin) {
  byte idx=0;
   
  if(pin==15){
	  idx=0;
  }else if(pin==16){
	  idx=1;
  }else if(pin==17){
	  idx=2;
  }else if(pin==8){
	  idx=3;
  }else if(pin==4){
	  idx=4;
  }
   Serial.println(idx);
  byte currentByte = inputKey[idx].measurementBuffer[byteCounter];
  inputKey[idx].oldestMeasurement = (currentByte >> bitCounter) & 0x01;

  // 读取新按键值
  boolean newMeasurement = digitalRead(pin);

  // 翻转端口读取值
  newMeasurement = !newMeasurement;

  // 存储当前按键值
  if (newMeasurement) {
    currentByte |= (1 << bitCounter);
    inputKey[idx].bufferSum++;
  }
  else {
    currentByte &= ~(1 << bitCounter);
  }
  inputKey[idx].measurementBuffer[byteCounter] = currentByte;
  if (inputKey[idx].oldestMeasurement) {
    inputKey[idx].bufferSum--;
  }

  if (inputKey[idx].isKeyDown)
  {
    if (inputKey[idx].bufferSum < 12) {
      inputKey[idx].isKeyDown = false;
    }
  }
  else
  {
    if (inputKey[idx].bufferSum > 14) { // 视为按键按下
      inputKey[idx].isKeyDown = true;
    }
  }
  return inputKey[idx].isKeyDown;
}
*/

bool CircleBitV2::checkPressKey(byte pin) {
	int sum = 0; //读取值累加在一起
	for (int i=0; i<4000; i++) {
		// 读取新按键值手摸是0，不摸是1
    sum  += digitalRead(pin);
	}
	if (sum < 500) {
		return 1;
	} else {
		return 0;
	}
}

//////////////////////////
// 模拟键盘读取键盘值
// 输入：端口（19-23），键盘值
// 输出：
//////////////////////////
/*void CircleBitV2::pressKeyboard(byte pin, int key) {
	if (checkPressKey(pin)) {
		Keyboard.press(key);
	}
	 else {
		Keyboard.release(key);   
	}                           
}*/
//////////////////////////
// 模拟键盘按键延时
// 输入：端口（19-23），键盘值
// 输出：
//////////////////////////

void CircleBitV2::delayForKey()
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
/*
long CircleBitV2::bluetoothRead() {
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
 */

 bool CircleBitV2::KeyRead(uint8_t keyport)
 {  
   
	 switch(keyport)
	 {
	    case 1:
	    return digitalRead(1);
		case 2:
	    return digitalRead(KEY2PIN);
	 }
	 
 }
  
 

	 
 

 

 