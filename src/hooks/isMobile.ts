'use client'
import { useEffect, useState } from 'react'
import { UAParser } from 'ua-parser-js'

interface AdvancedDeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  deviceType: 'mobile' | 'tablet' | 'desktop'
  deviceDetails: {
    brand?: string
    model?: string
    type?: string
    orientation: 'portrait' | 'landscape'
    os: string
    browser: string
  }
}

export const useAdvancedDevice = (): AdvancedDeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<AdvancedDeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    deviceType: 'desktop',
    deviceDetails: {
      orientation: 'landscape',
      os: '',
      browser: '',
    },
  })

  useEffect(() => {
    const updateDeviceInfo = () => {
      const parser = new UAParser()
      const result = parser.getResult()

      // Detectar por ancho de pantalla
      const width = window.innerWidth
      const height = window.innerHeight

      // Breakpoints
      const isMobileByWidth = width <= 768
      const isTabletByWidth = width > 768 && width <= 1024
      const isDesktopByWidth = width > 1024

      // Detectar por User Agent
      const deviceType = result.device.type
      const isMobileByUA = deviceType === 'mobile' || deviceType === 'smartphone'
      const isTabletByUA = deviceType === 'tablet'

      // Combinar ambas detecciones
      const isMobile = isMobileByWidth || isMobileByUA
      const isTablet = isTabletByWidth || isTabletByUA
      const isDesktop = isDesktopByWidth && !isMobile && !isTablet

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        deviceType: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
        deviceDetails: {
          brand: result.device.vendor,
          model: result.device.model,
          type: result.device.type,
          orientation: height > width ? 'portrait' : 'landscape',
          os: `${result.os.name} ${result.os.version}`,
          browser: `${result.browser.name} ${result.browser.version}`,
        },
      })
    }

    updateDeviceInfo()

    // Eventos para actualizar la información
    window.addEventListener('resize', updateDeviceInfo)
    window.addEventListener('orientationchange', updateDeviceInfo)

    return () => {
      window.removeEventListener('resize', updateDeviceInfo)
      window.removeEventListener('orientationchange', updateDeviceInfo)
    }
  }, [])

  return deviceInfo
}
