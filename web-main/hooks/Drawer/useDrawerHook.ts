import { ReactElement, useState } from "react";

export function useDrawerHook() {

  const [width, setWidth] = useState(720)
  const [open, setOpen] = useState(false)
  const [closable, setClosable] = useState(false)
  const [children, setChildren] = useState<ReactElement>()

  const handleClose = () => {
      setOpen(false)
  }

  const handleWidth = (width: number) => {
      setWidth(width)
  }

  const handleClosable = (closable: boolean) => {
      setClosable(closable)
  }

  const showDrawer = (component: ReactElement) => {
      setChildren(component)
      setOpen(true)
  }

  return {
      width,
      open,
      closable,
      handleClose,
      handleClosable,
      handleWidth,
      children,
      showDrawer
  }
}
