#include "OnlyIR.h"

OnlyIR::OnlyIR() {

}

void OnlyIR::setSendPin(byte pin) {
	IR_S = pin;
	pinMode(IR_S,OUTPUT);


}
void OnlyIR::setReceivePin(byte pin) {
	IR_R = pin;
	pinMode(IR_R,INPUT);

}

byte OnlyIR::getByte() {
	unsigned long pulses[MAX];
	unsigned char IRCOM[7];
	unsigned long z;
	int w;
	byte f = B00000000;
//	byte n;
	if (digitalRead(IR_R) == LOW) {
		//开始接收数据
		int count = 0;
		int exit1 = 0;
		while (!exit1) {
			while (digitalRead(IR_R) == LOW) {
				delayMicroseconds(MICRO_STEP);
			}
			unsigned long start = micros();
			int max_high = 0;
			while (digitalRead(IR_R) == HIGH) {
				delayMicroseconds(MICRO_STEP);
				max_high += MICRO_STEP;
				if (max_high > IDLE_PULSE) {
					exit1 = 1;
					break;
				}
			}
			unsigned long duration = micros() - start;
			pulses[count++] = duration;
		}
		for (int i = 3; i < 4; i++) {
			for (int j = 0; j < 8; j++) {
				if (pulses[i * 8 + j + 1] < IDLE_PULSE) {
					IRCOM[i] = IRCOM[i] >> 1;
					if (pulses[i * 8 + j + 1] > 1000) {
						IRCOM[i] = IRCOM[i] | 0x80;
					}
				}
				z = pulses[i * 8 + j + 1];
				if (z < 800) {
					w = 10000000;
				} else {
					w = 00000000;
				}
				f = f >> 1;
				f = f + w;
			}
		}
//		n = int(f);
		return f;
	}
	return 0;
}

char OnlyIR::getChar() {
	unsigned long pulses[MAX];
	unsigned char IRCOM[7];
	unsigned long z;
	int w;
	byte f = B00000000;
	char n;
	if (digitalRead(IR_R) == LOW) {
		//开始接收数据
		int count = 0;
		int exit1 = 0;
		while (!exit1) {
			while (digitalRead(IR_R) == LOW) {
				delayMicroseconds(MICRO_STEP);
			}
			unsigned long start = micros();
			int max_high = 0;
			while (digitalRead(IR_R) == HIGH) {
				delayMicroseconds(MICRO_STEP);
				max_high += MICRO_STEP;
				if (max_high > IDLE_PULSE) {
					exit1 = 1;
					break;
				}
			}
			unsigned long duration = micros() - start;
			pulses[count++] = duration;
		}
		for (int i = 3; i < 4; i++) {
			for (int j = 0; j < 8; j++) {
				if (pulses[i * 8 + j + 1] < IDLE_PULSE) {
					IRCOM[i] = IRCOM[i] >> 1;
					if (pulses[i * 8 + j + 1] > 1000) {
						IRCOM[i] = IRCOM[i] | 0x80;
					}
				}
				z = pulses[i * 8 + j + 1];
				if (z < 800) {
					w = 10000000;
				} else {
					w = 00000000;
				}
				f = f >> 1;
				f = f + w;
			}
		}
		n = int(f);
		return n;
	}
	return 0;
}
String OnlyIR::getString() {
	irRead = getChar();
	if (irRead != 0) {
		if (irRead == 0xa || irRead == 0xd) {
			irReady = true;
		} else {
			irBuffer += irRead;
		}
		irDelayTime = millis();
	} else {
		if (millis() - irDelayTime > 100) {
			irDelayTime = millis();
			Pre_Str = "";
		}
	}
	if (irReady) {
		irReady = false;
		String s = String(irBuffer);
		Pre_Str = s;
		irBuffer = "";
		return s;
	}
	return Pre_Str;
}
void OnlyIR::sendString(String s) {
	uint8_t data;
	s.concat('\n');
	for (unsigned int i = 0; i < s.length(); i++) {
		data = s.charAt(i);
		IR_Send38KHZ(280, 1); //发送9ms的起始码
		IR_Send38KHZ(140, 0); //发送4.5ms的结果码
		IR_Sendcode(ADD); //用户识别码
		IR_Sendcode(~ADD); //用户识别码反吗  
		IR_Sendcode(data); //操作码
		IR_Sendcode(~data); //操作码反码   
		IR_Send38KHZ(21, 1); //发送结束码
		delay(20);
	}
}

void OnlyIR::sendByte(byte data) {
		IR_Send38KHZ(280, 1); //发送9ms的起始码
		IR_Send38KHZ(140, 0); //发送4.5ms的结果码
		IR_Sendcode(ADD); //用户识别码
		IR_Sendcode(~ADD); //用户识别码反吗  
		IR_Sendcode(data); //操作码
		IR_Sendcode(~data); //操作码反码   
		IR_Send38KHZ(21, 1); //发送结束码
		delay(20);
}

void OnlyIR::IR_Send38KHZ(int x, int y) //产生38KHZ红外脉冲
		{
	for (int i = 0; i < x; i++) //15=386US
			{
		if (y == 1) {
			digitalWrite(IR_S, 1);
			delayMicroseconds(9);
			digitalWrite(IR_S, 0);
			delayMicroseconds(9);
		} else {
			digitalWrite(IR_S, 0);
			delayMicroseconds(20);
		}
	}
}

void OnlyIR::IR_Sendcode(uint8_t x) //
		{
	for (int i = 0; i < 8; i++) {
		if ((x & 0x01) == 0x01) {
			IR_Send38KHZ(23, 1);
			IR_Send38KHZ(64, 0);
		} else {
			IR_Send38KHZ(23, 1);
			IR_Send38KHZ(21, 0);
		}
		x = x >> 1;
	}
}
