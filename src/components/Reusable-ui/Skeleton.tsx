import styled, { keyframes } from 'styled-components';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
  variant = 'rectangular',
}) => {
  const getBorderRadius = () => {
    if (variant === 'circular') return '50%';
    if (variant === 'text') return '4px';
    return borderRadius;
  };

  return (
    <SkeletonWrapper
      width={width}
      height={height}
      borderRadius={getBorderRadius()}
    />
  );
};

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const SkeletonWrapper = styled.div<{
  width: string;
  height: string;
  borderRadius: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #e0e0e0 20%,
    #f0f0f0 40%,
    #f0f0f0 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s linear infinite;
  display: inline-block;
`;

export const CardSkeleton: React.FC = () => {
  return (
    <CardSkeletonWrapper>
      <Skeleton width="100%" height="160px" borderRadius="12px" />
      <SkeletonContent>
        <Skeleton width="70%" height="24px" borderRadius="6px" />
        <Skeleton width="40%" height="20px" borderRadius="4px" />
        <SkeletonFooter>
          <Skeleton width="60px" height="32px" borderRadius="8px" />
          <Skeleton width="80px" height="36px" borderRadius="8px" />
        </SkeletonFooter>
      </SkeletonContent>
    </CardSkeletonWrapper>
  );
};

const CardSkeletonWrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SkeletonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
`;

const SkeletonFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

export const BasketItemSkeleton: React.FC = () => {
  return (
    <BasketSkeletonWrapper>
      <Skeleton variant="circular" width="56px" height="56px" />
      <BasketSkeletonDetails>
        <Skeleton width="120px" height="16px" />
        <Skeleton width="80px" height="14px" />
        <Skeleton width="60px" height="14px" />
      </BasketSkeletonDetails>
      <Skeleton width="80px" height="28px" borderRadius="6px" />
      <Skeleton width="32px" height="32px" borderRadius="6px" />
    </BasketSkeletonWrapper>
  );
};

const BasketSkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 12px;
  margin: 8px 0;
`;

const BasketSkeletonDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default Skeleton;
