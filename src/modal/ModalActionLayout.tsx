import { useThemeConfig } from "../hooks/useThemeConfig";
import { ModalOverlay } from "./ModalOverlay";
import { ModalContent } from "./ModalContent";

export const ModalActionLayout = ({
  children,
  error,
  modalTitle,
  modalName,
  modalDescription,
}: {
  modalTitle: string;
  modalDescription: string;
  modalName: string;
  children: any;
  error?: string;
}) => {
  const { getStyles } = useThemeConfig();
  return (
    <ModalOverlay modalName={modalName} canClose>
      <ModalContent title={modalTitle} ariaLabel={modalDescription}>
        <div {...getStyles("modalText")}>
          {children}
          {error && (
            <p className="error">
              <br />
              {error}
            </p>
          )}
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};
