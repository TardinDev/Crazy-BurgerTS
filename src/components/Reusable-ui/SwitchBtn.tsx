import { useContext } from "react";
import { FaPowerOff } from "react-icons/fa";
import styled from "styled-components";
import orderContext from "../../context/orderContext";

type SwitchBtnType = {
  isActiveBtn: boolean;
};

export default function SwitchBtn() {

  const { isActiveBtn, setIsActiveBtn } = useContext(orderContext);

  const handleSwitchBtn = () => {
    setIsActiveBtn(!isActiveBtn);
  };

  return (
    <SwitchBtnStyle isActiveBtn={isActiveBtn} onClick={handleSwitchBtn}>
      <StatusIndicator isActiveBtn={isActiveBtn}>
        <FaPowerOff size={18} />
      </StatusIndicator>
      <LabelText isActiveBtn={isActiveBtn}>
        {isActiveBtn ? "Mode Actif" : "Mode Inactif"}
      </LabelText>
      <ToggleTrack isActiveBtn={isActiveBtn}>
        <ToggleThumb isActiveBtn={isActiveBtn} />
      </ToggleTrack>
    </SwitchBtnStyle>
  );
}

const SwitchBtnStyle = styled.div<SwitchBtnType>`
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${(props) =>
    props.isActiveBtn
      ? 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)'
      : 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
  };
  border: 2px solid ${(props) => (props.isActiveBtn ? "#ffa500" : "#444")};
  border-radius: 50px;
  padding: 8px 16px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(props) =>
    props.isActiveBtn
      ? '0 8px 24px rgba(255, 165, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      : '0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
  };
  min-width: 240px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: ${(props) => (props.isActiveBtn ? '0' : '-100%')};
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 165, 0, 0.1), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) =>
      props.isActiveBtn
        ? '0 12px 32px rgba(255, 165, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
        : '0 8px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
    };
    border-color: ${(props) => (props.isActiveBtn ? "#ffb730" : "#666")};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  @media (max-width: 1024px) {
    min-width: 200px;
    gap: 10px;
    padding: 7px 14px;
  }

  @media (max-width: 768px) {
    min-width: 180px;
    gap: 8px;
    padding: 6px 12px;
  }

  @media (max-width: 480px) {
    min-width: auto;
    width: 100%;
    max-width: 240px;
  }
`;

const StatusIndicator = styled.div<SwitchBtnType>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) =>
    props.isActiveBtn
      ? 'linear-gradient(135deg, #ffa500 0%, #ff8c00 100%)'
      : 'linear-gradient(135deg, #444 0%, #333 100%)'
  };
  color: ${(props) => (props.isActiveBtn ? '#000' : '#999')};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(props) =>
    props.isActiveBtn
      ? '0 4px 12px rgba(255, 165, 0, 0.5), inset 0 -2px 8px rgba(0, 0, 0, 0.2)'
      : '0 2px 8px rgba(0, 0, 0, 0.3)'
  };
  animation: ${(props) => props.isActiveBtn ? 'pulse 2s ease-in-out infinite' : 'none'};
  flex-shrink: 0;

  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 4px 12px rgba(255, 165, 0, 0.5), inset 0 -2px 8px rgba(0, 0, 0, 0.2);
    }
    50% {
      box-shadow: 0 6px 16px rgba(255, 165, 0, 0.7), inset 0 -2px 8px rgba(0, 0, 0, 0.2);
    }
  }

  svg {
    filter: ${(props) => props.isActiveBtn ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' : 'none'};
    width: 14px;
    height: 14px;
  }

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;

    svg {
      width: 13px;
      height: 13px;
    }
  }

  @media (max-width: 480px) {
    width: 26px;
    height: 26px;

    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

const LabelText = styled.span<SwitchBtnType>`
  flex: 1;
  color: ${(props) => (props.isActiveBtn ? "#ffa500" : "#999")};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
  text-shadow: ${(props) =>
    props.isActiveBtn
      ? '0 2px 8px rgba(255, 165, 0, 0.3)'
      : 'none'
  };
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const ToggleTrack = styled.div<SwitchBtnType>`
  width: 44px;
  height: 22px;
  border-radius: 11px;
  background: ${(props) =>
    props.isActiveBtn
      ? 'linear-gradient(135deg, #ffa500 0%, #ff8c00 100%)'
      : 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)'
  };
  border: 2px solid ${(props) => (props.isActiveBtn ? "#ffb730" : "#444")};
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(props) =>
    props.isActiveBtn
      ? 'inset 0 2px 8px rgba(0, 0, 0, 0.2)'
      : 'inset 0 2px 8px rgba(0, 0, 0, 0.5)'
  };
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 40px;
    height: 20px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    width: 38px;
    height: 19px;
  }
`;

const ToggleThumb = styled.div<SwitchBtnType>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${(props) =>
    props.isActiveBtn
      ? 'linear-gradient(135deg, #fff 0%, #f0f0f0 100%)'
      : 'linear-gradient(135deg, #666 0%, #555 100%)'
  };
  position: absolute;
  top: 50%;
  left: ${(props) => (props.isActiveBtn ? 'calc(100% - 16px)' : '2px')};
  transform: translateY(-50%);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(props) =>
    props.isActiveBtn
      ? '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(255, 165, 0, 0.2)'
      : '0 2px 4px rgba(0, 0, 0, 0.4)'
  };

  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
    left: ${(props) => (props.isActiveBtn ? 'calc(100% - 14px)' : '2px')};
  }

  @media (max-width: 480px) {
    width: 11px;
    height: 11px;
    left: ${(props) => (props.isActiveBtn ? 'calc(100% - 13px)' : '2px')};
  }
`;
