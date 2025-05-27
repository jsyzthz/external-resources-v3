/*
 * CircleBitV2.h
 *
 *  Created on: 2018年8月27日
 *      Author: haibin
 */
#include <Arduino.h>

#ifndef ONLYIR_H_
#define ONLYIR_H_

#define ADD 0x00

#define MAX 128
#define MICRO_STEP 10
#define IDLE_PULSE 4000


class CircleBitV2IR
{
	public:
		int IR_S = 0;
		int IR_R = 0;
		CircleBitV2IR();
		void setSendPin(byte pin);
		void setReceivePin(byte pin);
		void sendString(String s);
		void sendByte(byte data);
		byte getByte();
		String getString();
		char getChar();

	private:
		void IR_Send38KHZ(int x,int y);
		void IR_Sendcode(uint8_t x);


		char irRead;
		boolean irReady;
		String irBuffer;
		String Pre_Str;
		double irDelayTime;
};
#endif /* ONLYIR_H_ */
