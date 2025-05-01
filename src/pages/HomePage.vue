<script setup lang="ts">
import QRCode from 'qrcode'
import { ref, watch } from 'vue'
import HeroDisplay from '@/components/HeroDisplay.vue'
import QRCodeInput from '@/components/QRCodeInput.vue'
import QRCodeDisplay from '@/components/QRCodeDisplay.vue'
import ActionButtons from '@/components/ActionButtons.vue'

const data = defineModel({ default: '', type: String })
const imageBase64 = ref<string>('')

const generateQrCode = async (value: string): Promise<void> => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(value, {
      errorCorrectionLevel: 'H',
      width: 1000,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    })
    imageBase64.value = qrCodeDataUrl
  } catch (error) {
    console.error('Error generating QR code:', error)
    alert('Falha ao gerar o QR code.')
  }
}

const downloadQrCode = (): void => {
  const link = document.createElement('a')
  link.href = imageBase64.value
  link.download = 'QRCode.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const copyQrCode = async (): Promise<void> => {
  try {
    // Convert the data URL to a Blob
    const response = await fetch(imageBase64.value)
    const blob = await response.blob()

    // Create a ClipboardItem with the proper image type
    const item = new ClipboardItem({ 'image/png': blob })

    // Write the image to the clipboard
    await navigator.clipboard.write([item])

    alert('QRCode copiado!')
  } catch (error) {
    console.error('Error copying QR code:', error)
    alert('Falha ao copiar o QRCode.')
  }
}

// Watch for changes in data and generate QR code
watch(data, (newValue) => {
  if (newValue) {
    generateQrCode(newValue)
  }
})
</script>
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-slate-900 dark:to-slate-800 flex flex-col items-center py-12 px-4"
  >
    <div
      class="w-full max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 space-y-8"
    >
      <HeroDisplay />
      <QRCodeInput v-model:model-value="data" />

      <div class="flex flex-col md:flex-row items-center justify-center gap-8">
        <QRCodeDisplay :image-base64="imageBase64" @copy="copyQrCode" />
        <ActionButtons :image-base64="imageBase64" @copy="copyQrCode" @download="downloadQrCode" />
      </div>
    </div>
  </div>
</template>
