import React from 'react';
import styled from 'styled-components';

interface ImagePreviewProps {
  src?: string;
  alt?: string;
  fallbackText?: string;
  width?: string;
  height?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt = 'Preview',
  fallbackText = 'No image yet!',
  width = '200px',
  height = '120px',
}) => {
  return (
    <PreviewContainer width={width} height={height}>
      {src ? (
        <PreviewImage src={src} alt={alt} />
      ) : (
        <FallbackText>{fallbackText}</FallbackText>
      )}
    </PreviewContainer>
  );
};

const PreviewContainer = styled.div<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: 2px dashed #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #f9f9f9;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FallbackText = styled.h2`
  color: #666;
  font-size: 16px;
  text-align: center;
  margin: 0;
`;

export default ImagePreview;