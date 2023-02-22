function calculateDailyCalories(age, gender, weight, height, activityLevel) {
    let bmr;


    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }


    let calories;
    switch (activityLevel) {
        case 'sedentary':
            calories = bmr * 1.2;
            break;
        case 'lightly-active':
            calories = bmr * 1.375;
            break;
        case 'moderately-active':
            calories = bmr * 1.55;
            break;
        case 'very-active':
            calories = bmr * 1.725;
            break;
        case 'extra-active':
            calories = bmr * 1.9;
            break;
        default:
            calories = bmr * 1.2;
    }

    return calories;
}


const maleCalories = calculateDailyCalories(35, 'male', 80, 180, 'lightly-active');
const femaleCalories = calculateDailyCalories(28, 'female', 65, 160, 'moderately-active');

console.log(`男性每天需要的卡路里：${maleCalories}`);
console.log(`女性每天需要的卡路里：${femaleCalories}`);


/// we are going to given 30% of their daily calorise needs!