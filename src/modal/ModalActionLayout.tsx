import { useThemeConfig } from "../hooks/useThemeConfig";
import { ModalOverlay } from "./ModalOverlay";
import { ModalContent } from "./ModalContent";

export const ModalActionLayout = ({
  children,
  error,
  modalTitle,
  modalDescription,
}: {
  modalTitle: string;
  modalDescription: string;
  children: any;
  error?: string;
}) => {
  const { getStyles } = useThemeConfig();
  return (
    <ModalOverlay canClose>
      <ModalContent title={modalTitle} ariaLabel={modalDescription}>
        <div {...getStyles("modalContent")}>
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
