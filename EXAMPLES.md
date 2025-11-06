# SmartUI Kit - Children's App Examples

Real-world examples for building engaging children's applications with SmartUI Kit.

## 🎮 Complete Screen Examples

### 1. Learning Dashboard

A comprehensive dashboard for tracking child's learning progress:

```typescript
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Card,
  Avatar,
  Badge,
  Progress,
  CircularProgress,
  Stepper,
  Chip,
  ThemedButton,
  Divider,
} from '@/components';
import styled from 'styled-components/native';

export const LearningDashboard = ({ childName, avatar }) => {
  const [weekProgress, setWeekProgress] = useState(75);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <ProfileCard>
          <Avatar name={childName} source={avatar} size="large" status="online" />
          <WelcomeText>Hi {childName}! 👋</WelcomeText>
          <SubText>Ready to learn something new today?</SubText>
        </ProfileCard>

        <Divider />

        {/* Weekly Progress */}
        <Card title="This Week's Progress" headerIcon="trending-up" variant="elevated">
          <ProgressRow>
            <CircularProgress
              value={weekProgress}
              size="large"
              color="success"
              showLabel
            />
            <StatsColumn>
              <StatItem>
                <Badge text="5 Lessons" variant="success" size="small" />
              </StatItem>
              <StatItem>
                <Badge text="3 Rewards" variant="accent" size="small" />
              </StatItem>
              <StatItem>
                <Badge text="2 Days Streak 🔥" variant="error" size="small" />
              </StatItem>
            </StatsColumn>
          </ProgressRow>
        </Card>

        {/* Active Courses */}
        <Card title="Continue Learning" headerIcon="book" variant="outlined">
          <CourseItem>
            <CourseName>Math Adventures 🔢</CourseName>
            <Progress value={65} color="primary" showLabel />
            <ChipRow>
              <Chip label="Level 3" color="primary" size="small" />
              <Chip label="12 lessons left" color="secondary" size="small" />
            </ChipRow>
          </CourseItem>

          <Divider />

          <CourseItem>
            <CourseName>Reading Fun 📚</CourseName>
            <Progress value={40} color="accent" showLabel />
            <ChipRow>
              <Chip label="Level 2" color="accent" size="small" />
              <Chip label="Story time!" color="success" size="small" />
            </ChipRow>
          </CourseItem>
        </Card>

        {/* Learning Path */}
        <Card title="Your Learning Journey" variant="elevated">
          <Stepper
            steps={[
              { label: 'Basics', description: 'Learn the fundamentals' },
              { label: 'Practice', description: 'Solve fun puzzles', icon: 'construct' },
              { label: 'Master', description: 'Become an expert', icon: 'trophy' },
              { label: 'Share', description: 'Teach others!', icon: 'share-social' },
            ]}
            currentStep={1}
            variant="vertical"
            color="success"
          />
        </Card>

        {/* Quick Actions */}
        <ButtonRow>
          <ThemedButton
            title="Start Learning"
            variant="primary"
            fullWidth
            onPress={() => console.log('Start')}
          />
        </ButtonRow>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ProfileCard = styled.View`
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const WelcomeText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.h2}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

const SubText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

const ProgressRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.lg}px;
  align-items: center;
`;

const StatsColumn = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const StatItem = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const CourseItem = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px 0;
`;

const CourseName = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const ChipRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const ButtonRow = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.md}px;
`;
```

---

### 2. Reward & Achievement System

```typescript
import React from 'react';
import { FlatList } from 'react-native';
import {
  Card,
  Badge,
  NotificationBadge,
  Avatar,
  IconButton,
  Chip,
  FloatingActionButton,
  useToast,
} from '@/components';
import styled from 'styled-components/native';

export const RewardsScreen = ({ rewards, totalPoints }) => {
  const { showToast } = useToast();

  const handleClaimReward = (reward) => {
    showToast({
      message: `🎉 You claimed ${reward.name}!`,
      type: 'success',
    });
  };

  return (
    <Container>
      {/* Points Header */}
      <PointsCard variant="elevated">
        <PointsRow>
          <Avatar icon="star" size="large" backgroundColor="#FFD700" />
          <PointsInfo>
            <PointsText>{totalPoints} Points</PointsText>
            <PointsSubtext>Keep learning to earn more!</PointsSubtext>
          </PointsInfo>
          <NotificationBadge count={5} variant="accent">
            <IconButton icon="gift" variant="filled" color="accent" />
          </NotificationBadge>
        </PointsRow>
      </PointsCard>

      {/* Recent Achievements */}
      <Card title="Recent Achievements 🏆" headerIcon="trophy" variant="outlined">
        <AchievementRow>
          <Badge text="Math Master" variant="success" icon="calculator" />
          <Badge text="Reading Star" variant="primary" icon="book" />
          <Badge text="5 Day Streak" variant="error" icon="flame" />
        </AchievementRow>
      </Card>

      {/* Available Rewards */}
      <SectionTitle>Available Rewards</SectionTitle>

      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RewardCard
            title={item.name}
            subtitle={`${item.cost} points`}
            coverImage={item.image}
            variant="elevated"
            actions={[
              {
                label: totalPoints >= item.cost ? 'Claim' : 'Need more points',
                onPress: () => handleClaimReward(item),
              },
            ]}
          >
            <ChipRow>
              <Chip
                label={`${item.cost} pts`}
                color="accent"
                icon="star"
                size="small"
              />
              {item.category && (
                <Chip label={item.category} color="primary" size="small" />
              )}
            </ChipRow>
          </RewardCard>
        )}
      />

      <FloatingActionButton
        icon="add"
        label="Earn Points"
        extended
        color="accent"
        position="bottom-right"
        onPress={() => showToast('Complete lessons to earn more points!', 'info')}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const PointsCard = styled(Card)`
  margin: ${({ theme }) => theme.spacing.lg}px;
`;

const PointsRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const PointsInfo = styled.View`
  flex: 1;
`;

const PointsText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.h1}px;
  color: ${({ theme }) => theme.colors.primary};
`;

const PointsSubtext = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.small}px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const AchievementRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const SectionTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.h3}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 0 ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const RewardCard = styled(Card)`
  margin: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;
`;

const ChipRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;
```

---

### 3. Interactive Quiz/Game Screen

```typescript
import React, { useState } from 'react';
import {
  Card,
  Progress,
  IconButton,
  ThemedButton,
  Rating,
  Alert,
  BottomSheet,
  useToast,
} from '@/components';
import styled from 'styled-components/native';

export const QuizScreen = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const { showToast } = useToast();

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);

    if (answer === question.correctAnswer) {
      setScore(score + 1);
      showToast({ message: '🎉 Correct!', type: 'success' });
    } else {
      showToast({ message: 'Not quite! Try again! 💪', type: 'error' });
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  return (
    <Container>
      {/* Progress Header */}
      <HeaderCard variant="elevated">
        <ProgressInfo>
          <QuestionNumber>
            Question {currentQuestion + 1} of {questions.length}
          </QuestionNumber>
          <Progress value={progress} color="primary" showLabel />
        </ProgressInfo>

        <ScoreDisplay>
          <IconButton icon="star" variant="filled" color="accent" />
          <ScoreText>{score}</ScoreText>
        </ScoreDisplay>
      </HeaderCard>

      {/* Question Card */}
      <QuestionCard title={question.title} variant="outlined">
        <QuestionText>{question.question}</QuestionText>

        {question.image && <QuestionImage source={{ uri: question.image }} />}

        <AnswersContainer>
          {question.answers.map((answer, index) => (
            <AnswerButton
              key={index}
              variant={
                selectedAnswer === answer
                  ? answer === question.correctAnswer
                    ? 'success'
                    : 'error'
                  : 'primary'
              }
              title={answer}
              onPress={() => !selectedAnswer && handleAnswer(answer)}
              disabled={selectedAnswer !== null}
            />
          ))}
        </AnswersContainer>

        {question.hint && (
          <Alert
            type="info"
            icon="bulb"
            message={question.hint}
            variant="outlined"
          />
        )}
      </QuestionCard>

      {/* Result Bottom Sheet */}
      <BottomSheet
        visible={showResult}
        onClose={() => onComplete(score)}
        title="Quiz Complete! 🎊"
        size="large"
      >
        <ResultContainer>
          <Rating
            value={score / questions.length * 5}
            max={5}
            size="large"
            color="warning"
            showValue
            readOnly
          />

          <ResultText>
            You scored {score} out of {questions.length}!
          </ResultText>

          <ResultMessage>
            {score === questions.length
              ? '🏆 Perfect! You are amazing!'
              : score >= questions.length / 2
              ? '🌟 Great job! Keep it up!'
              : '💪 Good try! Practice makes perfect!'}
          </ResultMessage>

          <ThemedButton
            title="Done"
            variant="primary"
            fullWidth
            onPress={() => onComplete(score)}
          />
        </ResultContainer>
      </BottomSheet>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const HeaderCard = styled(Card)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const ProgressInfo = styled.View`
  flex: 1;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const QuestionNumber = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const ScoreDisplay = styled.View`
  align-items: center;
`;

const ScoreText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.h2}px;
  color: ${({ theme }) => theme.colors.accent};
`;

const QuestionCard = styled(Card)`
  flex: 1;
`;

const QuestionText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.h3}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  line-height: 28px;
`;

const QuestionImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: ${({ theme }) => theme.radius.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const AnswersContainer = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const AnswerButton = styled(ThemedButton)`
  min-height: 56px;
`;

const ResultContainer = styled.View`
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

const ResultText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.h2}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
`;

const ResultMessage = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  line-height: 24px;
`;
```

---

## 💡 Quick Component Snippets

### Star Rating with Feedback

```typescript
import { Rating, useToast } from '@/components';

const ActivityRating = () => {
  const { showToast } = useToast();

  const handleRating = (value) => {
    const messages = {
      5: '🌟 Amazing! You loved it!',
      4: '😊 Great job!',
      3: '👍 Pretty good!',
      2: '😐 It was okay',
      1: '😔 Let\'s try something else',
    };

    showToast({ message: messages[value], type: 'success' });
  };

  return (
    <Rating
      value={0}
      onChange={handleRating}
      max={5}
      size="large"
      allowHalf={false}
    />
  );
};
```

### Time-Limited Challenge

```typescript
import { CircularProgress, Alert, ThemedButton } from '@/components';
import { useState, useEffect } from 'react';

const TimedChallenge = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const progress = (timeLeft / duration) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <CircularProgress
        value={progress}
        size="large"
        color={timeLeft < 10 ? 'error' : 'success'}
        showLabel
      />

      {timeLeft < 10 && (
        <Alert type="warning" message="Hurry up! ⏰" variant="filled" />
      )}
    </>
  );
};
```

### Safe Content Filter

```typescript
import { EmptyState, Alert } from '@/components';

const SafeContent = ({ content, isApproved }) => {
  if (!isApproved) {
    return (
      <>
        <Alert
          type="warning"
          title="Waiting for Approval"
          message="Ask your parent to approve this content!"
          icon="lock-closed"
        />

        <EmptyState
          icon="shield-checkmark"
          title="Content Locked"
          description="This content is waiting for parental approval"
          variant="minimal"
        />
      </>
    );
  }

  return content;
};
```

---

## 🎨 Theme Customization Tips

### Playful Color Palette

```typescript
export const playfulTheme = {
  colors: {
    primary: '#FF6B9D',      // Playful pink
    secondary: '#4ECDC4',    // Turquoise
    accent: '#FFE66D',       // Sunny yellow
    success: '#95E1D3',      // Mint green
    error: '#FF6B9D',        // Same as primary for consistency
    warning: '#F38181',      // Coral
  },
  // ... rest of theme
};
```

### Large, Kid-Friendly Fonts

```typescript
export const kidFriendlyTypography = {
  fontFamily: {
    regular: 'ComicNeue-Regular',  // Fun, readable font
    bold: 'ComicNeue-Bold',
  },
  fontSize: {
    tiny: 14,
    small: 16,
    body: 18,      // Larger for easy reading
    h3: 22,
    h2: 28,
    h1: 36,
  },
};
```

---

## 📱 Best Practices for Children's Apps

1. **Large Touch Targets**
   - Use `size="large"` for buttons and interactive elements
   - Add extra padding around clickable areas

2. **Clear Visual Feedback**
   - Use Toast messages for every action
   - Animate buttons with `AnimatedButton`
   - Show progress with Progress/CircularProgress

3. **Positive Reinforcement**
   - Use Badge components for achievements
   - Show Rating stars for completed activities
   - Display encouraging Alert messages

4. **Simple Navigation**
   - Use BottomSheet for options instead of complex menus
   - Keep navigation hierarchy flat
   - Use icons with labels (IconButton)

5. **Safe Content**
   - Use Dialog for confirmations
   - Implement EmptyState for locked content
   - Add parent verification with Modal

6. **Progress Tracking**
   - Use Stepper for multi-step activities
   - Show Progress bars for completion
   - Display Chip tags for status

---

## 🚀 Performance Tips

1. **Lazy Load Content**
   ```typescript
   import { Skeleton, SkeletonCard } from '@/components';

   const LoadingState = () => (
     <>
       <SkeletonCard hasAvatar hasImage lines={3} />
       <SkeletonCard hasAvatar hasImage lines={3} />
     </>
   );
   ```

2. **Optimize Images**
   - Use optimized images in Card coverImage
   - Implement Avatar with fallback icons
   - Load images progressively

3. **Smooth Animations**
   - All components use `react-native-reanimated`
   - Animations run on UI thread (60fps)
   - Use `withSpring` for natural feel

---

**For more examples, run the app and check the Component Showcase! 🎨**
