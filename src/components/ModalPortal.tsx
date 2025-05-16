import { createPortal } from "react-dom";
import { ReactNode, useEffect, useState } from "react";

type ModalPortalProps = {
  children: ReactNode;
};

const ModalPortal = ({ children }: ModalPortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const portalRoot = document.getElementById("modal-root");
  return portalRoot ? createPortal(children, portalRoot) : null;
};

export default ModalPortal;
