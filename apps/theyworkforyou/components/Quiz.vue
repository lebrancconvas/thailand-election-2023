<template>
  <div class="quiz-container">
    <div class="header">
      <p class="typo-b7 no">{{ quiz_no }}/10</p>
      <p class="typo-h6 title">
        <b>{{ quiz_data.Title }}</b>
      </p>
      <p class="typo-b6">ชื่อเต็ม : {{ quiz_data.LegalTitle }}</p>
    </div>
    <div class="description-box" :class="collapsed ? 'collapsed' : 'expanded'">
      <p class="typo-b7 head"><b>รายละเอียด</b></p>
      <div
        class="description typo-b5"
        id="quiz-description"
        v-html="markdownToHtml"
      />
      <div class="collapse-label" @click="collapsed = !collapsed">
        <p class="typo-b7">
          {{ collapsed ? '+ อ่านเพิ่มเติม' : '- ปิดรายละเอียด' }}
        </p>
      </div>
    </div>
    <div class="vote-label">
      <p
        class="typo-b4"
        :class="{
          'unmatch-vote': answer_selected && mp_answer !== answer_selected,
        }"
      >
        <b>{{
          !answer_selected
            ? 'ถ้าเป็นคุณ จะโหวต..'
            : mp_answer === answer_selected
            ? 'ว้าว คุณโหวตตรงกัน !'
            : 'อุ้ย คุณโหวตต่างกัน !'
        }}</b>
      </p>
      <div
        v-if="
          !['เห็นด้วย', 'ไม่เห็นด้วย', 'งดออกเสียง'].includes(mp_answer) &&
          answer_selected
        "
        class="other-vote"
      >
        <span>เพราะ</span>
        <div v-if="mp_answer !== VOTELOG_NOT_FOUND_LABEL" class="img-wrap">
          <img :src="getMpImage" alt="" />
        </div>
        <span>{{ mp_answer }}..</span>
      </div>
    </div>
    <div class="choices-wrap">
      <AnswerChoice
        v-for="answer in answers"
        :key="answer.value"
        :text="answer.label"
        :choice_id="answer.value"
        :mp_answer="mp_answer"
        :answer_selected="answer_selected"
        :mp_image="getMpImage"
        @click.native="selectAnswer(answer.label)"
        :style="{ 'pointer-events': answer_selected === '' ? 'auto' : 'none' }"
      />
    </div>
    <div
      class="next-btn"
      :class="answer_selected ? 'show' : 'hide'"
      @click="nextQuiz"
      @mouseover="hover_next_btn = true"
      @mouseout="hover_next_btn = false"
    >
      <div class="arrow">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 11.9948C3.87122 11.9948 7.13296 12.535 8 12.4519C9.39793 12.3177 10.0866 11.8218 11.5 11.8095C13.8391 11.7891 14.403 11.7559 16.7274 11.8774C17.2641 11.9055 17.4925 11.9392 18 11.9392C17.4868 11.4045 17.6308 10.7459 17.1105 10.2158C15.1622 8.23111 9.12732 2.45561 11.1279 4.39104C12.6243 5.83864 14.2582 7.19694 15.8144 8.58514C17.13 9.75868 18.585 10.8904 20.105 11.8095C20.4578 12.0228 21.3426 12.1667 20.8584 12.4519C19.498 13.253 18.1647 14.0273 16.8934 14.9597C15.3977 16.0568 13.8539 17.1073 12.3347 18.1716C12.2147 18.2557 12.0396 18.3779 11.9643 18.5052C11.6151 19.0965 10.7743 19.4117 10.4703 20"
            :stroke="hover_next_btn ? '#00EAA4' : '#090909'"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { TheyWorkForUs } from '@thailand-election-2023/database'
const { marked } = require('marked')

const VOTELOG_NOT_FOUND_LABEL = 'อยู่ในช่วงรอ ส.ส. ใหม่มาแทนตำแหน่งที่ว่าง'

export default {
  props: {
    quiz_no: {
      type: Number,
      default: 0,
    },
    quiz_data: {
      type: Object,
      default: {},
    },
    mp_data: {
      type: Array,
      default: () => [],
    },
    nextQuiz: {
      type: Function,
      default: () => {},
    },
    countMatchVote: {
      type: Function,
      default: () => {},
    },
    user_voting_results: {
      type: Array,
      default: () => [],
    },
    saveVoteResult: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      arrow_right: require('~/assets/images/icons/arrow_right.svg'),
      answers: [
        { label: 'เห็นด้วย', value: 'approve' },
        { label: 'ไม่เห็นด้วย', value: 'disprove' },
        { label: 'งดออกเสียง', value: 'abstained' },
      ],
      mp_answer: '',
      answer_selected: '',
      collapsed: true,
      mp_data_current: {},
      hover_next_btn: false,
      VOTELOG_NOT_FOUND_LABEL,
    }
  },
  async mounted() {
    this.updateMpData()
  },
  watch: {
    async quiz_no() {
      if (this.quiz_no <= this.user_voting_results.length) {
        this.answer_selected = this.user_voting_results.find(
          (vote) => vote.vote_no === this.quiz_no
        ).user_answer
      } else {
        this.answer_selected = ''
      }
      this.collapsed = true

      this.updateMpData()
    },
  },
  methods: {
    selectAnswer(answer) {
      this.answer_selected = answer
      this.saveVoteResult({
        vote_no: this.quiz_no,
        user_answer: answer,
      })
      if (answer === this.mp_answer) {
        this.countMatchVote()
      }
    },
    async updateMpData() {
      const [personVote] = await TheyWorkForUs.PeopleVotes.fetchAll({
        where: `(nc_9rqw__Votelog_id,eq,${
          this.quiz_data.Id
        })~and(nc_9rqw__People_id,in,${this.mp_data
          .map(({ Id }) => Id)
          .join(',')})`,
      })

      if (personVote) {
        this.mp_answer = personVote.Status
        this.mp_data_current = this.mp_data.find(
          ({ Id }) => personVote.Person.Id === Id
        )
      } else {
        this.mp_answer = VOTELOG_NOT_FOUND_LABEL
      }
    },
  },
  computed: {
    getMpImage() {
      if (Object.keys(this.mp_data_current).length > 0) {
        return this.mp_data_current.Images[0].url
      }
    },
    markdownToHtml() {
      const renderer = new marked.Renderer()
      renderer.link = function (href, title, text) {
        return (
          '<a target="_blank" href="' +
          href +
          '" title="' +
          title +
          '">' +
          text +
          '</a>'
        )
      }

      setTimeout(() => {
        const el = document.querySelector('#quiz-description ol')
        if (el) {
          el.style.listStyle = 'decimal'
          el.style.listStylePosition = 'inside'
        }
      }, 0)

      return marked(this.quiz_data.DescriptionTh, { renderer: renderer })
    },
  },
}
</script>

<style lang="scss" scoped>
.quiz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 40px;
}
.header {
  .no,
  .title {
    margin-bottom: 5px;
  }
}
.description-box {
  background: var(--color-gray-1);
  padding: 10px;
  margin: 20px 0;
  text-align: left;
  transition: 0.5s;
  overflow: hidden;
  .head {
    margin-bottom: 4px;
  }
  &.expanded {
    max-height: 800px;
    .description {
      display: unset;
      -webkit-line-clamp: unset;
      -webkit-box-orient: unset;
      overflow: auto;
    }
  }
  &.collapsed {
    max-height: 120px;
    .description {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 46px;
      @include mobile {
        height: 41px;
      }
    }
  }
  .collapse-label {
    color: var(--color-gray-3);
    padding: 6px 0;
    cursor: pointer;
  }
}
.vote-label {
  margin-bottom: 20px;
  white-space: nowrap;
  .unmatch-vote {
    color: var(--color-red);
  }
  .other-vote {
    display: flex;
    align-items: center;
    margin-top: 5px;
    .img-wrap {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 5px;
    }
  }
}
.choices-wrap {
  display: flex;
  flex-direction: column;
  gap: 13px;
  width: 100%;
}
.next-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 3px solid var(--color-black);
  border-radius: 50%;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    border-color: var(--color-highlight-2);
  }
  .arrow {
    width: 24px;
  }
  &.show {
    opacity: 1;
  }
  &.hide {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
