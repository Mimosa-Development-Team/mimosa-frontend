export default function capitalizeText(data) {
  return (
    data.charAt(0).toUpperCase() + data.slice(1).toLowerCase()
  )
}
