#ifndef TPR_SSD1306_I2C_H
#define TPR_SSD1306_I2C_H

#include "TPR_SSD1306.h"
#include "Wire.h"

#ifdef ESP_PLATFORM
#define SSD1306_I2CBEGIN()Wire.setClock(700000);
#else
#define SSD1306_I2CBEGIN()        Wire.setClock(400000);
#endif
#define SSD1306_I2CEND()          Wire.setClock(100000);


class TPR_SSD1306_I2C : public TPR_SSD1306
{
    public:

    TPR_SSD1306_I2C();
#if defined(ESP_PLATFORM) || defined(NRF5)
    void      drawPixel(int16_t x, int16_t y, uint16_t color);
#endif
    private:

    void      writeDatBytes(uint8_t* pDat, uint16_t count);
    void      writeCmd(uint8_t cmd);
};

#endif

