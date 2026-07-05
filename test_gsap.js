import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(CustomEase)
try {
  CustomEase.create("narrative", "cubic-bezier(0.25, 0.0, 0.10, 1.0)")
  console.log("Success with cubic-bezier string")
} catch (e) {
  console.error("Error with cubic-bezier string:", e.message)
}

try {
  CustomEase.create("narrative2", "0.25, 0.0, 0.10, 1.0")
  console.log("Success with number string")
} catch (e) {
  console.error("Error with number string:", e.message)
}
