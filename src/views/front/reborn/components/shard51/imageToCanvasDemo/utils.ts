export function convertImageToCanvas(imageElementId: string, canvasElementId: string): void {
  const canvas: HTMLCanvasElement | null = document.getElementById(canvasElementId) as HTMLCanvasElement
  const image: HTMLImageElement | null = document.getElementById(imageElementId) as HTMLImageElement

  if (canvas && image) {
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')

    // 等待图像加载完成
    image.onload = function () {
      if (ctx) {
        // 将图像绘制到Canvas上
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      }
    }

    // 如果图像已经加载完成，直接执行绘制操作
    if (image.complete) {
      if (ctx) {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      }
    }
  }
}
