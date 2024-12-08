<template>
    <video ref="video" autoplay playsinline></video>
</template>

<script lang="ts">
import BaseVideo from '@/components/video/BaseVideo';
import container from '@/model/ModelContainer';
import ISnackbarState from '@/model/state/snackbar/ISnackbarState';
import { Component, Prop } from 'vue-property-decorator';
import Mpegts from 'mpegts.js';
import * as apid from '../../../../api';

@Component({})
export default class RecordedMMTTLVVideo extends BaseVideo {
    @Prop({ required: true })
    public videoFileId!: apid.VideoFileId;

    private snackbarState: ISnackbarState = container.get<ISnackbarState>('ISnackbarState');
    private mepgtsPlayer: Mpegts.Player | null = null;

    public mounted(): void {
        super.mounted();
    }

    public async beforeDestroy(): Promise<void> {
        if (this.mepgtsPlayer !== null) {
            this.mepgtsPlayer.pause();
            this.mepgtsPlayer.unload();
            this.mepgtsPlayer.destroy();
            this.mepgtsPlayer = null;
        }

        super.beforeDestroy();
    }

    /**
     * video 再生初期設定
     */
    protected initVideoSetting(): void {
        // 対応しているか確認
        if (Mpegts.isSupported() === false) {
            this.snackbarState.open({
                color: 'error',
                text: '非対応ブラウザーです。',
            });

            throw new Error('UnsupportedBrowser');
        }

        if (this.video === null) {
            this.snackbarState.open({
                color: 'error',
                text: 'video 要素がありません。',
            });
            throw new Error('VideoIsNull');
        }
        const video = this.video;

        Mpegts.supportWorkerForMSEH265Playback().then(enableWorkerForMSE => {
            // mpegts.js の設定
            Mpegts.LoggingControl.enableVerbose = true;
            const mpegtsConfig: Mpegts.Config = {
                enableWorkerForMSE,
                enableStashBuffer: false,
                lazyLoadMaxDuration: 20,
                lazyLoadRecoverDuration: 10,
            };
            this.mepgtsPlayer = Mpegts.createPlayer(
                {
                    type: 'mmttlv',
                    isLive: false,
                    url: new URL(`./api/videos/${this.videoFileId}`, location.href).toString(),
                },
                mpegtsConfig,
            );

            this.mepgtsPlayer.attachMediaElement(video);
            this.mepgtsPlayer.load();
            this.mepgtsPlayer.on(Mpegts.Events.AUDIO_TRACKS_METADATA, e => this.$emit('audiotracksmetadata', e));
            this.mepgtsPlayer.play();
        });
    }

    public selectAudioTrack(id: string): void {
        if (this.mepgtsPlayer != null) {
            this.mepgtsPlayer.switchAudioTrack(id);
        }
    }
}
</script>
