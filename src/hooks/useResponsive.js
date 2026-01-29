import { useState, useEffect } from 'react';
import { RESPONSIVE_BREAKPOINTS, getBreakpoint, getColumnsForZoom } from '../constants/responsive';

/**
 * 반응형 브레이크포인트 Hook
 *
 * Window resize 이벤트를 감지하여 현재 브레이크포인트와 설정을 반환합니다.
 * - Debounce 적용 (150ms)
 * - SSR 안전 (window 체크)
 * - 성능 최적화 (필요할 때만 리렌더)
 *
 * @returns {Object} Responsive state
 * @returns {number} state.width - 현재 viewport 너비
 * @returns {string} state.breakpoint - 현재 브레이크포인트 키
 * @returns {Object} state.config - 현재 브레이크포인트 설정
 *
 * @example
 * const { width, breakpoint, config } = useResponsive();
 * console.log(config.gap); // 48 (Full HD 기준)
 * console.log(config.columns.zoom0); // 9
 */
export const useResponsive = () => {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') {
      return {
        width: 1920,
        breakpoint: 'fullHD',
        config: RESPONSIVE_BREAKPOINTS.fullHD,
      };
    }

    const width = window.innerWidth;
    const breakpoint = getBreakpoint(width);
    return {
      width,
      breakpoint,
      config: RESPONSIVE_BREAKPOINTS[breakpoint],
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId;

    const handleResize = () => {
      const width = window.innerWidth;
      const breakpoint = getBreakpoint(width);
      const config = RESPONSIVE_BREAKPOINTS[breakpoint];

      setState((prev) => {
        if (prev.breakpoint === breakpoint) {
          return { ...prev, width };
        }
        
        console.log('📱 Breakpoint changed:', {
          from: prev.breakpoint,
          to: breakpoint,
          width,
          label: config.label,
        });
        return { width, breakpoint, config };
      });
    };

    const debouncedHandleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedHandleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return state;
};

/**
 * Zoom level을 고려한 반응형 컬럼 Hook
 *
 * useResponsive에 zoom level 계산을 추가한 버전
 *
 * @param {number} zoomLevel - 현재 Zoom level (0, 1, 2)
 * @returns {Object} Responsive state with columns
 * @returns {number} state.columns - 현재 zoom level에 맞는 컬럼 수
 * @returns {number} state.gap - 그리드 간격 (px)
 * @returns {string} state.breakpoint - 브레이크포인트 키
 * @returns {Object} state.config - 전체 설정 객체
 *
 * @example
 * const { columns, gap, config } = useResponsiveColumns(zoomLevel);
 * <DynamicGrid columns={columns} gap={gap} />
 */
export const useResponsiveColumns = (zoomLevel = 0) => {
  const { width, breakpoint, config } = useResponsive();

  const columns = getColumnsForZoom(breakpoint, zoomLevel);

  return {
    width,
    columns,
    gap: config.gap,
    breakpoint,
    config,
    containerPadding: config.containerPadding,
    headerPadding: config.headerPadding,
  };
};

/**
 * 디버그용: 현재 반응형 상태를 콘솔에 출력
 *
 * @param {string} breakpoint - 브레이크포인트 키
 * @param {Object} config - 설정 객체
 * @param {number} zoomLevel - Zoom level (선택)
 */
export const logResponsiveState = (breakpoint, config, zoomLevel = 0) => {
  const columns = getColumnsForZoom(breakpoint, zoomLevel);

  console.log('🔍 Current Responsive State:', {
    breakpoint: config.label,
    zoomLevel,
    columns,
    gap: config.gap,
    containerPadding: config.containerPadding,
    headerPadding: config.headerPadding,
    enableZoom: config.enableZoom,
  });
};

export default useResponsive;
