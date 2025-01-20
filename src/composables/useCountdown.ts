import { ref, Ref, computed, onUnmounted } from 'vue';

interface CountdownFunctions {
  start: () => void;
  pause: () => void;
  reset: () => void;
}

interface CountdownSetup {
  timeLeft: Ref<number>;
  isActive: Ref<boolean>;
  formattedTime: Ref<string>;
}

export const useCountdown = (initialTime = 60): CountdownSetup & CountdownFunctions => {
  const timeLeft = ref<number>(initialTime);
  const isActive = ref<boolean>(false);
  let interval: ReturnType<typeof setInterval> | null = null;

  function start(): void {
    if (!isActive.value && timeLeft.value > 0) {
      isActive.value = true;
      interval = setInterval(() => {
        if (timeLeft.value > 0) {
          timeLeft.value--;
        } else {
          pause();
        }
      }, 1000);
    }
  }

  function pause(): void {
    if (isActive.value && interval) {
      clearInterval(interval);
      isActive.value = false;
    }
  }

  function reset(): void {
    pause();
    timeLeft.value = initialTime;
    start();
  }

  onUnmounted(() => {
    if (interval) {
      clearInterval(interval);
    }
  });

  const formattedTime = computed(() => {
    const hours: number = Math.floor(timeLeft.value / 3600);
    const minutes: number = Math.floor((timeLeft.value % 3600) / 60);
    const seconds: number = timeLeft.value % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  });

  return {
    timeLeft,
    isActive,
    formattedTime,
    start,
    pause,
    reset,
  };
};
