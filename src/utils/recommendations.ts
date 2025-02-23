type TimeRecommendation = {
  title: string;
  description: string;
  icon: 'sunrise' | 'coffee' | 'sun' | 'moon';
};

export const getTimeBasedRecommendations = (hour: number): TimeRecommendation[] => {
  if (hour >= 6 && hour < 11) {
    return [
      {
        title: 'Breakfast Specials',
        description: 'Start your day with our fresh breakfast menu',
        icon: 'sunrise'
      },
      {
        title: 'Morning Coffee',
        description: 'Freshly brewed coffee to kickstart your day',
        icon: 'coffee'
      }
    ];
  } else if (hour >= 11 && hour < 15) {
    return [
      {
        title: 'Lunch Combos',
        description: 'Perfect lunch combinations for your midday break',
        icon: 'sun'
      }
    ];
  } else if (hour >= 15 && hour < 19) {
    return [
      {
        title: 'Evening Snacks',
        description: 'Light bites and refreshing beverages',
        icon: 'sun'
      }
    ];
  } else {
    return [
      {
        title: 'Dinner Specials',
        description: 'End your day with our chef\'s special dinner menu',
        icon: 'moon'
      }
    ];
  }
};