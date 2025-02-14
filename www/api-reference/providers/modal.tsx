"use client"

import React, { useContext, useEffect, useState } from "react"
import { createContext } from "react"
import Modal, { ModalProps } from "../components/Modal"

type ModalContextType = {
  modalProps: ModalProps | null
  setModalProps: (value: ModalProps | null) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

type ModalProviderProps = {
  children?: React.ReactNode
}

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalProps, setModalProps] = useState<ModalProps | null>(null)

  const closeModal = () => {
    setModalProps(null)
  }

  useEffect(() => {
    if (modalProps) {
      document.body.setAttribute("data-modal", "opened")
    } else {
      document.body.removeAttribute("data-modal")
    }
  }, [modalProps])

  return (
    <ModalContext.Provider
      value={{
        modalProps,
        setModalProps,
        closeModal,
      }}
    >
      {children}
      {modalProps && (
        <>
          <div className="bg-medusa-bg-overlay dark:bg-medusa-bg-overlay-dark fixed top-0 left-0 z-[499] h-screen w-screen"></div>
          <Modal {...modalProps} onClose={closeModal} />
        </>
      )}
    </ModalContext.Provider>
  )
}

export default ModalProvider

export const useModal = () => {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider")
  }

  return context
}
