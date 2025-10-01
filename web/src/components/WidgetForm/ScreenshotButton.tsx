import { useState } from "react"
import { toPng } from "html-to-image"
import { Camera, Trash } from "phosphor-react"
import { Loading } from "../Loading"

interface ScreenshotButtonProps {
  screenshot: string | null
  onScreenshotTook: (screenshot: string | null) => void
}

export function ScreenshotButton({ 
  screenshot,
  onScreenshotTook 
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true)

    const html = document.querySelector("html")
    if (!html) return

    try {
      const base64 = await toPng(html, {
        backgroundColor: getComputedStyle(document.body).backgroundColor
      })

      console.log(base64) // base64 da screenshot
      onScreenshotTook(base64) 
    } catch (err) {
      console.error("Erro ao capturar tela:", err)
      onScreenshotTook(null) 
    }

    setIsTakingScreenshot(false)
  }

  if (screenshot) {
    return (
      <button
        type="button"
        title="Remover screenshot"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        onClick={() => onScreenshotTook(null)}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180,
        }}
      >
        <Trash weight="fill" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors"
    >
      {isTakingScreenshot ? (
        <Loading />
      ) : (
        <Camera className="w-6 h-6" />
      )}
    </button>
  )
}
